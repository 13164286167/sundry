function createText(string,data) { 
  let text;
  if (data.style) {
      text = new PIXI.Text(string, new PIXI.TextStyle(data.style));
  } else {
      text = new PIXI.Text(string);
  }
  text.x = data.x ? data.x : text.x;
  text.y = data.y ? data.y : text.y;
  return text;
}