<template>
    <div>
        <div :style="getBlackStyle1" class="lineWidth"></div>
        <div :style="getBlackStyle2" class="lineHeight"></div>
        <div :style="getBlackStyle3"></div>
        <div :style="getBlackStyle4"></div>
        <div  @mousedown="moveDown($event,'moveDiv')" :style="controlerStyle" ref="controlerDiv" >
            <span class="s11" :style="topLeftStyle"></span>
            <span class="s12" :style="topCenterStyle"></span>
            <span class="s13" :style="topRightStyle"></span>
            <span class="s21" :style="leftCenterStyle"></span>
            <span class="s23" :style="rightCenterStyle"></span>
            <span class="s31" :style="bottomLeftStyle"></span>
            <span class="s32" :style="bottomCenterStyle"></span>
            <span class="s33" :style="bottomRightStyle"></span>
            <span class="sPivot" :style="sPivotStyle"></span>
        </div>
        <span @mousedown="moveDown($event,'turnPoint')" :style="pivotStyle" id="turnPoint" ></span>
        <span  @mousedown="moveDown($event,'topLeft',0,0)" :style="showTopLeftStyle"></span>
        <span  @mousedown="moveDown($event,'topCenter')"  :style="showTopCenterStyle"></span>
        <span  @mousedown="moveDown($event,'topRight')" :style="showTopRightStyle"></span>
        <span  @mousedown="moveDown($event,'leftCenter')"  :style="showLeftCenterStyle"></span>
        <span  @mousedown="moveDown($event,'rightCenter')"  :style="showRightCenterStyle"></span>
        <span  @mousedown="moveDown($event,'bottomLeft')"  :style="showBottomLeftStyle"></span>
        <span  @mousedown="moveDown($event,'bottomCenter')"  :style="showBottomCenterStyle"></span>
        <span  @mousedown="moveDown($event,'bottomRight')"  :style="showBottomRightStyle"></span>
        <div class="controlerRotate">
            <span :style="topLeftTurnStyle" @mousedown="moveDown($event,'topTurn')"></span>
            <span :style="topRightTurnStyle" @mousedown="moveDown($event,'topTurn')"></span>
            <span :style="bottomLeftTurnStyle" @mousedown="moveDown($event,'topTurn')"></span>
            <span :style="bottomRightTurnStyle" @mousedown="moveDown($event,'topTurn')"></span>
        </div>
    </div>
</template>
<script>
 import Matrix from "./Matrix"
 import {getMoreBounds} from "../../editMethod/common"
 import {setPixiObjWorldTransform} from "../../editStatus/setMethod"
  export default{
    name: "controler",
    props:["arr"],
    data(){
      return {
        width:0,
        height:0,
        mouseStart:{},//鼠标按下位置
        matrixChange:new Matrix(),//总变形量
        matrixChangePixi:new Matrix(),//pixi变形量，但是pixi每个变形量有区别
        matrixStart:{},//控制器matrix
        down:false,
        changeType:'',//变形类型
        turnPoint:{},//中心点全局坐标
        topLeftPoint:{},//控制器div左上角0,0全局坐标
        hasMounted:false,//组件是否挂载
        PivotNotInit:true,//中心点尚未初始化
        pivotStyle:null,//中心点样式
        pivotAnchor:{x:0,y:0},//鼠标按下记录中心点位置
        angleChange:0,//角度变化量
        scaleChange:{x:1,y:1},//缩放变化量
        anchorObj:{},//初始div显示宽高       27号添加初始中心点
        offsetChange:{x:0,y:0},//偏移量
      }
    },
    created(){
        this.initControler();
    },
    mounted(){
        window.mm1 = this.matrixChange;
        window.mm2 = new Matrix();
        this.hasMounted = true;
        this.initPivot(); 
    },
    watch:{
        getWidthHeight:{
            handler:function(){
            //    this.initControler();
            // console.log("变化了rect")
            },
            deep:true
        },
        
    },
    methods:{
        initControler(){
            this.width=this.getWidthHeight.width;//这里最好直接给弄成rem的  不用担心缩放问题//
            this.height=this.getWidthHeight.height;
            this.matrixStart = this.getMatrix.clone();
        },
        initPivot(){
            let point = document.getElementsByClassName("s11")[0].getBoundingClientRect();
            let style = this.getPointStyle({x:point.x,y:point.y},"pivot");
            this.pivotStyle = Object.assign(style,{cursor:"move"});
        },
        moveDown(e,type){
            let pivot = document.getElementById("turnPoint");
            let topLeft = document.getElementsByClassName("s11")[0].getBoundingClientRect();


            let lineWidth = document.getElementsByClassName("lineWidth")[0].getBoundingClientRect();
            let lineHeight = document.getElementsByClassName("lineHeight")[0].getBoundingClientRect();

            this.anchorObj.width = lineWidth.width  ;
            this.anchorObj.height = lineHeight.height ;
            this.anchorObj.angleChange = this.angleChange;
            // this.anchorObj.pivot = {x:parseFloat(this.pivotStyle.left)*window.base+0.5,top:parseFloat(this.pivotStyle.top)*window.base+0.5}
            
            this.anchorObj.scaleChange = Object.assign({},{x:this.scaleChange.x-1,y:this.scaleChange.y-1});
            this.anchorObj.offsetChange = Object.assign({},this.offsetChange)
            console.log(this.anchorObj)
            this.topLeft = {x:topLeft.x + 0.5,y:topLeft.y + 0.5};
            let point = pivot.getBoundingClientRect();
            this.pivotAnchor.left = parseFloat(pivot.style.left);
            this.pivotAnchor.top = parseFloat(pivot.style.top);
            this.turnPoint = {x:point.x+point.width/2,y:point.y+point.height/2};
            this.mouseStart = {x:e.clientX,y:e.clientY};
            this.changeType = type;

            let ss = this.matrixStart.applyInverse(this.turnPoint);
            let ww = this.matrixStart.applyInverse(this.topLeft);
            let aa = {x:parseInt(ss.x-ww.x),y:parseInt(ss.y - ww.y)}
            this.anchorObj.pivot = {x:aa.x,y:aa.y}

            document.addEventListener("mousemove",this.moveFun);//绑定move事件
            document.addEventListener("mouseup",()=>{
            document.removeEventListener("mousemove",this.moveFun);
            document.removeEventListener("mouseup",this.moveFun);
            this.changePixi();

            });
        },
        moveFun(e){
            let type = this.changeType;
            let x = e.clientX-this.mouseStart.x;
            let y = e.clientY-this.mouseStart.y;
            if(type==="topTurn"){
                this.changeRotate(e.clientX,e.clientY,this.turnPoint.x,this.turnPoint.y);
            }else if(type === "turnPoint"){
                this.changePivot(x,y);
            }else if(type === "moveDiv"){
                this.changePosition(type,x,y);
            }else{
                this.changeSize(type,x,y);
            }
            let aa = this.anchorObj.pivot;
            console.log({x:this.offsetChange.x+aa.x,y:this.offsetChange.y+aa.y,pivotX:aa.x,pivotY:aa.y,scaleX:this.scaleChange.x,scaleY:this.scaleChange.y,angle:this.angleChange,skewX:0,skewY:0})
            this.matrixChange.setTransform(this.offsetChange.x+aa.x,this.offsetChange.y+aa.y,aa.x,aa.y,this.scaleChange.x,this.scaleChange.y,this.angleChange,0,0);
            // console.log(this.matrixChange)
        },      
        changePosition(type,x,y){
            let ss = this.matrixStart.applyInverse({x:0,y:0})
            let aa = this.matrixStart.applyInverse({x:x,y:y})
            let bb = {x:aa.x-ss.x,y:aa.y-ss.y}
            this.pivotStyle.left = parseFloat(this.pivotAnchor.left) + x / window.base + "rem";
            this.pivotStyle.top = parseFloat(this.pivotAnchor.top) + y / window.base + "rem";

            this.offsetChange.x = this.anchorObj.offsetChange.x + bb.x;
            this.offsetChange.y = this.anchorObj.offsetChange.y + bb.y;
            // this.matrixChange.setTransform(this.offsetChange.x,this.offsetChange.y,0,0,this.scaleChange.x,this.scaleChange.y,this.angleChange,0,0);
            
            this.matrixChangePixi.setTransform(bb.x/this.canvasScale,bb.y/this.canvasScale,0,0,1,1,0,0,0)
        },
        changeSize(type,x,y){   
        //相对中心点变化量
            // let turnPoint = this.matrixStart.applyInverse(this.turnPoint)
            // let topLeft = this.matrixStart.applyInverse(this.topLeft)
            let wb = (this.turnPoint.x-this.topLeft.x) / this.anchorObj.width;//宽度%
            let hb = (this.turnPoint.y-this.topLeft.y) / this.anchorObj.height;//高度%
            wb = parseInt(wb*100)/100;
            hb = parseInt(hb*100)/100;
            // console.log(wb,hb)
            // x = x/(1-wb);
            // y = y/(1-hb);
        //     let w = x;
        //     let h = y;

        //     //计算相对中心点变化量
        // if(type === "topCenter"){
        //   if(hb != 0) h = h / hb;
        //   w = 0;
        // }
        // if(type === "rightCenter"){
        //   if(wb != 1)w = w / (1-wb);
        //   h = 0;
        // }
        // if(type === "bottomCenter"){
        //   if(hb != 1)h = h / (1 - hb);
        //   w = 0;
        // }
        // if(type === "leftCenter"){
        //   if(wb != 0)w = -w / wb;
        //   h = 0;
        // }
        // if(type === "topLeft"){
        //   if(wb != 0)w =  -w / wb;
        //   if(hb != 0)h = -h / hb;
        // }
        // if(type === "topRight"){
        //   if(wb != 1)w =  w / (1 - wb);
        //   if(hb != 0)h = -h / hb;
        // }
        // if(type === "bottomRight"){
        //   if(wb != 1)w =  w / (1 - wb);
        //   if(hb != 1)h = h / (1 - hb);
        // }
        // if(type === "bottomLeft"){
        //   if(wb != 0)w =  -w / wb;
        //   if(hb != 1)h = h / (1 - hb);
        // }
        // x = w ;
        // y = h ;



            let scaleXDom = (this.anchorObj.width + x)/this.anchorObj.width ;
            let scaleYDoM = (this.anchorObj.height + y)/this.anchorObj.height ;
            // console.log(scaleXDom,scaleYDoM)
            let ss = this.matrixStart.applyInverse(this.turnPoint);
            let ww = this.matrixStart.applyInverse(this.topLeft);
            let aa = {x:parseInt(ss.x-ww.x),y:parseInt(ss.y - ww.y)}

            this.scaleChange.x = this.anchorObj.scaleChange.x + scaleXDom ;
            this.scaleChange.y = this.anchorObj.scaleChange.y + scaleYDoM ;

            // this.matrixChange.setTransform(0,0,0,0,this.scaleChange.x,this.scaleChange.y,this.angleChange,0,0);
            // this.matrixChangePixi.setTransform(0,0,0,0,scaleXDom,scaleYDoM,0,0,0)
        },
        changeRotate(x,y,x1,y1){//x=e.clientX,y=e.clientY,y1=this.turnPoint.x,y2=this.turnPoint.y

            let angleChange = Math.atan2(this.mouseStart.x-x1,this.mouseStart.y-y1)-Math.atan2(x-x1,y-y1);
            this.angleChange = this.anchorObj.angleChange + angleChange;

            let ss = this.matrixStart.applyInverse(this.turnPoint);
            let ww = this.matrixStart.applyInverse(this.topLeft);
            let aa = {x:parseInt(ss.x-ww.x),y:parseInt(ss.y - ww.y)}
            // console.log(aa)

            // this.matrixChange.setTransform(0,0,0,0,this.scaleChange.x,this.scaleChange.y,this.angleChange,0,0);

        },
        changePivot(x,y){

            this.pivotStyle.left = parseFloat(this.pivotAnchor.left) + x/ window.base + "rem";
            this.pivotStyle.top = parseFloat(this.pivotAnchor.top) + y/ window.base + "rem";
        },



        changePixi(){
            let thisObj = this;
            let canvas = document.getElementsByTagName("canvas")[0].getBoundingClientRect();
            this.arr.map((item)=>{
                //relativePviot  元素中心点相对于全局中心点的计算
                    let relativePviot = item.transform.worldTransform.applyInverse({x:(this.turnPoint.x-canvas.x)/this.canvasScale,y:(this.turnPoint.y-canvas.y)/this.canvasScale})
                    console.log(relativePviot)
                    let changeMatrix = this.matrixChangePixi.clone().setTransform(relativePviot.x,relativePviot.y,relativePviot.x,relativePviot.y,this.pixiScaleChange.x,this.pixiScaleChange.y,this.pixiAngle,0,0)
                    let after = item.transform.worldTransform.clone().append(changeMatrix);

                item.transform.setFromMatrix(new PIXI.Matrix(after.a,after.b,after.c,after.d,after.tx,after.ty))
                //  setPixiObjWorldTransform(item.id,item.transform.worldTransform.clone().append(this.matrixChangePixi))
            });
            // this.matrixStart.append(this.matrixChange);
            // this.matrixChange.setTransform(0,0,0,0,1,1,0,0,0);
            // this.angleChange = 0;
            // this.pixiScale = {x:1,y:1}
            // this.matrixChangePixi.setTransform(0,0,0,0,1,1,0,0,0)
        },



        getcircleBaseStyle(paramObj){//参数x,y,left,top,background,isPivot,isturn
            let {x,y,left,top,background,isPivot,isturn} = paramObj;
            return {
            width:"0px",
            height:"0px",
            boxSizing:"border-box",
            position:"absolute",
            left:x+"px",
            top:y+"px",
            zIndex:"0",
            pointerEvents:"auto",
            background:background||"#000",
            }
        },
         getStyle(position,position1){//计算显示控制器公共方法
            let canvasPistion = document.getElementsByTagName("canvas")[0].getBoundingClientRect();
            let x = position.x,y=position.y,x1 = position1.x,y1 = position1.y;
            let height = Math.sqrt(Math.pow((x-x1),2)+Math.pow((y-y1),2));
            let rotate = (270-Math.atan2(position1.x-position.x,(position1.y-position.y)))*180/Math.PI+10;
            let line = "0.01rem solid black";
            let base = window.base;
            return Object.assign({borderRight:line,height:height/window.base+"rem",pointerEvents:'none',position:"absolute",left:x/base-canvasPistion.x/base+"rem",top:y/base-canvasPistion.y/base+"rem",transformOrigin:"top left",transform:"rotate("+rotate+180+"deg)"});
        },
        getPointStyle(position,type){
            let canvasPistion = document.getElementsByTagName("canvas")[0].getBoundingClientRect();
            let x = position.x,y=position.y
            let width = 0.1;
            let height = 0.1;
            let background = "rgba(0,0,0,1)";
            let border="1px solid #fff";
            let zIndex = 55;
            let borderRadius = 0;
            if(type === true){
                background = "rgba(0,0,0,0.5)";
                zIndex = 50;
                width = 0.32;
                height = 0.32;
            }else if (type === "pivot"){
                zIndex = 60
                background = "rgba(255,255,255,1)";
                border = "1px solid black";
                borderRadius = '100%';
            }
            let style = {
                display:"block",
                width:width+"rem",
                height:height+"rem",
                boxSizing:"border-box",
                position:"absolute",
                left:x/window.base-canvasPistion.x/window.base-width/2+"rem",
                top:y/window.base-canvasPistion.y/window.base-height/2+"rem",
                border:border,
                borderRadius:borderRadius,
                pointerEvents:"auto",
                background:background,
                zIndex:zIndex
            }
            return style;
        }
    },
    computed:{
        controlerStyle(){
            let matrix = this.matrix.a+","+ this.matrix.b+","+ this.matrix.c+","+ this.matrix.d+","+ this.matrix.tx+","+ this.matrix.ty;
            return {
                width: this.width+"px",
                height: this.height+"px",
                position:"relative",
                transform: "matrix("+matrix+")",
                // border:"0.01rem solid #000",
                transformOrigin:"left top",
            }
        },

        matrix(){//this.matrixStart 是以bounds生成的matrix
            return this.matrixStart.clone().append(this.matrixChange); 
        },
        getMatrix(){
            if(this.arr.length>1){
                let bound = getMoreBounds(this.arr);
                return new Matrix().setTransform(bound.x*this.canvasScale,bound.y*this.canvasScale,0,0,1,1,0,0,0)
            }else if(this.arr.length===1){
               
            }
        },
        getWidthHeight(){
            if(this.arr.length>1){
                let bound = getMoreBounds(this.arr);
                return {width:bound.width*this.canvasScale,height:bound.height*this.canvasScale}
            }else if(this.arr.length===1){
                
            }
        },
        
// 计算控制点
        topLeftStyle(){
            let cursor = "nw-resize";
            return Object.assign({cursor:cursor},this.getcircleBaseStyle({x:0,y:0}));
        },
        topCenterStyle(){
            let cursor ="n-resize";
            return Object.assign({cursor:cursor},this.getcircleBaseStyle({x:this.width/2,y:0}));
        },
        topRightStyle(){
            let cursor = "ne-resize";
            return Object.assign({cursor:cursor},this.getcircleBaseStyle({x:this.width,y:0}));
        },
        leftCenterStyle(){
            let cursor = "w-resize";
            return Object.assign({cursor:cursor},this.getcircleBaseStyle({x:0,y:this.height/2}));
        },
        rightCenterStyle(){
            let cursor = "e-resize";
            return Object.assign({cursor:cursor},this.getcircleBaseStyle({x:this.width,y:this.height/2}));
        },
        bottomLeftStyle(){
            let cursor = "canvasScaleChage-resize";
            return Object.assign({cursor:cursor},this.getcircleBaseStyle({x:0,y:this.height}));
        },
        bottomCenterStyle(){
            let cursor = "s-resize";
            return Object.assign({cursor:cursor},this.getcircleBaseStyle({x:this.width/2,y:this.height}));
        },
        bottomRightStyle(){
            let cursor = "se-resize";
            return Object.assign({cursor:cursor},this.getcircleBaseStyle({x:this.width,y:this.height}));
        },
        sPivotStyle(){
            let cursor = "move";
            return Object.assign({cursor:cursor},this.getcircleBaseStyle({x:0,y:0}));
        },
        
// 计算控制点
//计算显示控制器
        getBlackStyle1(){
            if( this.hasMounted){
                getMoreBounds(this.arr)
                let p1 = document.getElementsByClassName("s11")[0].getBoundingClientRect();
                let p2 = document.getElementsByClassName("s13")[0].getBoundingClientRect();
                let position1 = {x:p1.x,y:p1.y};
                let position2 = {x:p2.x,y:p2.y};
                return this.getStyle(position1,position2)
            }
        },
        getBlackStyle2(){
            if( this.hasMounted){
                getMoreBounds(this.arr)
                let p1 = document.getElementsByClassName("s13")[0].getBoundingClientRect();
                let p2 = document.getElementsByClassName("s33")[0].getBoundingClientRect();
                let position1 = {x:p1.x,y:p1.y};
                let position2 = {x:p2.x,y:p2.y};
                return this.getStyle(position1,position2)
            }
        },
        getBlackStyle3(){
            if( this.hasMounted){
                getMoreBounds(this.arr)
                let p1 = document.getElementsByClassName("s33")[0].getBoundingClientRect();
                let p2 = document.getElementsByClassName("s31")[0].getBoundingClientRect();
                let position1 = {x:p1.x,y:p1.y};
                let position2 = {x:p2.x,y:p2.y};
                return this.getStyle(position1,position2)
            }
        },
        getBlackStyle4(){
            if( this.hasMounted){
                getMoreBounds(this.arr)
                let p1 = document.getElementsByClassName("s31")[0].getBoundingClientRect();
                let p2 = document.getElementsByClassName("s11")[0].getBoundingClientRect();
                let position1 = {x:p1.x,y:p1.y};
                let position2 = {x:p2.x,y:p2.y};
                return this.getStyle(position1,position2)
            }
        },


        showTopLeftStyle(){
            if(this.hasMounted){
                getMoreBounds(this.arr)
            let point = document.getElementsByClassName("s11")[0].getBoundingClientRect();
            let cursor = "nw-resize";
            return Object.assign({cursor:cursor},this.getPointStyle({x:point.x,y:point.y}));
            }
        },
        showTopCenterStyle(){
            if(this.hasMounted){
                getMoreBounds(this.arr)
            let point = document.getElementsByClassName("s12")[0].getBoundingClientRect();

            let cursor ="n-resize";
            return Object.assign({cursor:cursor},this.getPointStyle({x:point.x,y:point.y}));
            }
        },
        showTopRightStyle(){
            if(this.hasMounted){
                getMoreBounds(this.arr)
            let point = document.getElementsByClassName("s13")[0].getBoundingClientRect();

            let cursor = "ne-resize";
            return Object.assign({cursor:cursor},this.getPointStyle({x:point.x,y:point.y}));
            }
        },
        showLeftCenterStyle(){
            if(this.hasMounted){
                getMoreBounds(this.arr)
            let point = document.getElementsByClassName("s21")[0].getBoundingClientRect();

            let cursor = "w-resize";
            return Object.assign({cursor:cursor},this.getPointStyle({x:point.x,y:point.y}));
            }
        },
        showRightCenterStyle(){
            if(this.hasMounted){
                getMoreBounds(this.arr)
            let point = document.getElementsByClassName("s23")[0].getBoundingClientRect();

            let cursor = "e-resize";
            return Object.assign({cursor:cursor},this.getPointStyle({x:point.x,y:point.y}));
            }
        },
        showBottomLeftStyle(){
            if(this.hasMounted){
                getMoreBounds(this.arr)
            let point = document.getElementsByClassName("s31")[0].getBoundingClientRect();

            let cursor = "sw-resize";
            return Object.assign({cursor:cursor},this.getPointStyle({x:point.x,y:point.y}));
            }
        },
        showBottomCenterStyle(){
            if(this.hasMounted){
                getMoreBounds(this.arr)
            let point = document.getElementsByClassName("s32")[0].getBoundingClientRect();

            let cursor = "s-resize";
            return Object.assign({cursor:cursor},this.getPointStyle({x:point.x,y:point.y}));
            }
        },
        showBottomRightStyle(){
            if(this.hasMounted){
                getMoreBounds(this.arr)
            let point = document.getElementsByClassName("s33")[0].getBoundingClientRect();
            let cursor = "se-resize";
            return Object.assign({cursor:cursor},this.getPointStyle({x:point.x,y:point.y}));
            }
        },
    //计算显示控制器
    //旋转点控制点
            topLeftTurnStyle(){
                if(this.hasMounted){
                    getMoreBounds(this.arr)
                    let point = document.getElementsByClassName("s11")[0].getBoundingClientRect();
                    let style = this.getPointStyle({x:point.x,y:point.y},true);
                    return Object.assign(style,{cursor: "url('../../../static/icon/turn17.png'),auto"});
                }
            },
            topRightTurnStyle(){
                if(this.hasMounted){
                    getMoreBounds(this.arr)
                    let point = document.getElementsByClassName("s13")[0].getBoundingClientRect();
                    let style = this.getPointStyle({x:point.x,y:point.y},true);
                    return Object.assign(style,{cursor: "url('../../../static/icon/turn17.png'),auto"});
                }
            },
            bottomLeftTurnStyle(){
                if(this.hasMounted){
                    getMoreBounds(this.arr)
                    let point = document.getElementsByClassName("s31")[0].getBoundingClientRect();
                    let style = this.getPointStyle({x:point.x,y:point.y},true);
                    return Object.assign(style,{cursor: "url('../../../static/icon/turn17.png'),auto"});
                }
            },
            bottomRightTurnStyle(){
                if(this.hasMounted){
                    getMoreBounds(this.arr)
                    let point = document.getElementsByClassName("s33")[0].getBoundingClientRect();
                    let style = this.getPointStyle({x:point.x,y:point.y},true);
                    return Object.assign(style,{cursor: "url('../../../static/icon/turn17.png'),auto"});
                }
            },
    //旋转点控制点
    //中心点
            showPivotStyle(){
                if(this.hasMounted && this.PivotNotInit){
                    
                    getMoreBounds(this.arr)
                    let point = document.getElementsByClassName("sPivot")[0].getBoundingClientRect();
                    let style = this.getPointStyle({x:point.x,y:point.y},"pivot");
                    return Object.assign(style,{cursor: "move"});
                    this.PivotNotInit = false;
                }
            },
            canvasScale(){
                return this.$store.state.viewScale;
            },
        
    },
}
</script>
<style>

</style>

