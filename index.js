window.onload = ()=>{
  let open = document.getElementById("open"),   //入口页面
      page = document.getElementById("page"),   //游戏界面
      pageMain = document.getElementById("pageMain"),    //游戏面板
      pageReturn  = document.getElementById("pageReturn"),   //左上方 返回首页
      shade = document.getElementById("shade"),   //遮罩层
      shadeTitle = document.getElementById("shadeTitle"),   //遮罩标题
      shadeAgain = document.getElementById("shadeAgain"),   //游戏结束 再来一次
      shadeReturn = document.getElementById("shadeReturn"),   //游戏结束 返回首页
      item = document.createElement("span"),   //新建元素
      colorList = [
        ["#556B2F","#8B814C","#5D478B","#191970","#668B8B","#483D8B","#008B8B","#363636","#009ACD","#8B4726",
        "#000000","#8B636C","#2F4F4F","#551A8B","#8B4C39","#00688B","#8B0A50","#CD3700","#2E8B57","#CD8500",
        "#8B3A3A","#473C8B","#8A2BE2","#FF3030","#8B6914","#FF1493","#8B864E"],
        ["#2F4F4F","#2E8B57","#668B8B","#8B0A50","#CD8500","#B03060","#8A2BE2","#8B4726","#FF1493","#551A8B",
        "#556B2F","#000000","#5D478B","#00868B","#FF3030","#8B4C39","#8B6914","#CD3700","#008B8B","#8B814C",
        "#8B3A3A","#363636","#00688B","#8B636C","#191970","#473C8B","#009ACD","#8B475D","#8B864E","#483D8B",
        "#8B7D6B","#8B008B"],
        ["#191970","#551A8B","#8B4C39","#CD8500","#473C8B","#8A2BE2","#FF3030","#8B6914","#FF1493","#556B2F",
        "#8B814C","#5D478B","#009ACD","#2F4F4F","#CD3700","#008B8B","#8B864E","#483D8B","#668B8B","#8B3A3A",
        "#B03060","#363636","#8B4726","#000","#8B636C","#00688B","#8B0A50","#2E8B57","#00868B","#8B475D",
        "#8B7D6B","#8B008B"],
        ["#FFE4E1","#9AFF9A","#87CEFA","#FFF68F","#ADFF2F","#F5DEB3","#EEE8CD","#C1CDCD","#D1EEEE","#BCD2EE"]
      ];

  // 进入页面
  let into = (e)=>{
    if(e.target.nodeName.toLowerCase() === 'button'){
      // 获取数据
      let total = e.target.dataset.totel,
          number = e.target.dataset.number,
          prop = e.target.dataset.name,
          index = e.target.dataset.index;

      page.className += " active";
      let CLICK_ORDER = 0;

      // 渲染页面
      let draw = (order)=>{
        if(order == number){
          // 通关游戏
          shade.className += " active";
          shadeTitle.innerHTML = "你怎么这么可爱！";
          shadeAgain.className ="hide";
        }else{
          // 游戏继续
          pageMain.innerHTML = "";
          let num = Math.floor( Math.random()*total);
          for(let i = 0; i < total; i++){
            let cloneNode = item.cloneNode(true);
            if(i == num){
              cloneNode.className = "itemBtn " + prop;
              cloneNode.style.backgroundColor = colorList[index][order];
              cloneNode.style.opacity = .9;
              pageMain.appendChild(cloneNode);
              pageMain.getElementsByClassName("itemBtn")[0].onclick = ()=>{
                document.getElementsByClassName("itemBtn")[0].className +=" active"
                setTimeout(()=>{
                  draw(CLICK_ORDER)
                },800)
              };
            }else{
              cloneNode.className = prop;
              cloneNode.style.backgroundColor = colorList[index][order];
              pageMain.appendChild(cloneNode);
            };
          };
          CLICK_ORDER++;
        };
      };
      draw(CLICK_ORDER);
      // 方块点击
      pageMain.addEventListener('click', (e)=>{
        if(e.target && e.target.nodeName.toLowerCase() === 'span'){
          if(!e.target.classList.contains('itemBtn')){
            shade.className = "shade active";
            shadeTitle.innerHTML = "啊奥~好可惜~";
            shadeAgain.className = "";
            shadeAgain.innerHTML = "重新来过";
          }
        }
      })
      // 重新来过
      shadeAgain.onclick = ()=>{
        CLICK_ORDER = 0;
        draw(CLICK_ORDER);
        shade.className = "shade";
      }
    };
  };

  //隐藏游戏引导
  document.getElementById("introHide").onclick = ()=>{
    document.getElementById("intro").style.display = 'none';
  };
  
  // 入口页添加按钮点击事件
  open.addEventListener('click', (e)=>into(e));

  // 返回首页
  pageReturn.onclick = ()=>{
    page.className = "page";
    pageMain.innerHTML = "";
  };
  shadeReturn.onclick = ()=>{
    shade.className = "shade";
    setTimeout(()=>{
      page.className = "page";
      pageMain.innerHTML = "";
    }, 500);
  };
}