
function registerIt(defaultFontSize, w, h){
    //defaultFontSize:
    //     Number
    //     默认字体大小，canvas宽度不够字体会自动缩小
    // w
    //     Number
    //     生成图片的宽度
    // h
    //     Number
    //     生成图片的高度
    var __cvs = document.createElement('canvas');
    var __ctx = __cvs.getContext('2d');
    var __lineBreak = 20;   //一行最多有这个多个字
    var __dataURL = '';
    var __currentFs = defaultFontSize;

    init();

    function init(){
        __cvs.width = w;
        __cvs.height = h;
    }

    function drawLine(aLine, fontSize, pos){
        __ctx.font = fontSize + 'px SimHei';
        __ctx.textAlign = "center";  
        __ctx.fillText( aLine, __cvs.width/2, pos.y );   //垂直居中
    }

    function draw(text){
        setFontSize(text);
        console.log(__currentFs);
        var fs = __currentFs;
        var lines = breakText(text);
        var md = (lines.length>1)?(lines.length/2):0;

        for(var i=0; i<lines.length; i++){
            var pos = {
                y: __cvs.height/2 + (i-md)*fs + fs/2
            }
            if(lines.length === 1)  pos.y = __cvs.height/2 + fs/4;

            drawLine(lines[i], fs, pos);
        }
        
        __dataURL = __cvs.toDataURL();
        clear();
    }

    function breakText(str){
        var len = str.len;
        var lines = [];
        if(len <= __lineBreak)  return;

        var start = 0;
        var end = 0;

        for(i=0; ; i++){
            end = start + __lineBreak;
            var realEnd = (end>str.length)?str.length:end;

            var newLine = str.slice(start, end );
            lines.push(newLine);

            start = realEnd;
            if(realEnd == str.length){
                break;
            }
        }
        return lines;
    }

    function setFontSize(rawText){
        var text = (rawText.length > __lineBreak)?rawText.slice(0, __lineBreak):rawText;
        __currentFs = defaultFontSize;
        __ctx.font = __currentFs + 'px SimHei';
        var fw = __ctx.measureText(text);
        while(fw.width >= __cvs.width){
            __currentFs--;
            __ctx.font = __currentFs + 'px SimHei';
            fw = __ctx.measureText(text);
        }
    }

    function clear(){
        var w=__cvs.width;
        var h=__cvs.height;
        __ctx.clearRect(0,0,w,h);
    }

    function getPng(imageId, text){
        var imgEle = document.querySelector('#' + imageId);
        draw(text);
        imgEle.src = __dataURL;
    }

    return {
        getPng: getPng
    }

}
