var cp=document.querySelector('.colorplate').children;
        for(var k=0;k<cp.length;k+=1)
        {
            cp[k].style.backgroundColor=cp[k].id;
        }
    

        var cv=document.getElementById('canv');
        var cnt=cv.getContext('2d');
        cnt.canvas.width=window.innerWidth;
        cnt.canvas.height=window.innerHeight;
        var canvaCont=document.querySelector('.canvasContainer');
        var rect=canvaCont.getBoundingClientRect();
        var color="black";
        document.getElementById('current').style.backgroundColor='black';
        var width=3;
        cnt.lineCap='round';
        var paint=false;
        var eraze=false;
        var tool="brush";
        var erz;
        var x,y;
        var side=50;
        var drop1=document.getElementById('drop1');
        var drop2=document.getElementById('drop2');
        window.addEventListener('load',()=>{
        cnt.fillStyle="white";
        cnt.fillRect(0,0,rect.right,rect.bottom);
        cv.addEventListener('mousedown',start);
        cv.addEventListener('mousemove',move);
        cv.addEventListener('mouseup',stop);
        });
        function coords(e)
        {
           x=e.clientX-cv.offsetLeft;
           y=e.clientY-cv.offsetTop;
        }   
        function start(e)
        {
          coords(e);
          if(tool=='brush')
            paint=true;
          else 
          {
            cnt.fillStyle="white";
            cnt.fillRect(x,y,side,side);
            eraze=true;
          }
        }
        function move(e)
        {
            if(paint)
            {   
                cnt.beginPath();
                cnt.strokeStyle=color;
                cnt.lineWidth=width;
                cnt.moveTo(x,y);
                x=e.clientX-cv.offsetLeft;
                y=e.clientY-cv.offsetTop;
                cnt.lineTo(x,y);
                cnt.stroke();
            }
            else if(tool=="erazer")
            {
               coords(e);
               
                erz.style.top=e.clientY+"px";
                erz.style.left=e.clientX+"px";
               
               if(eraze)
               {
                cnt.fillStyle="white";
                cnt.fillRect(x,y,side,side);
               }
            } 
            else 
             return;
        }
        function stop()
        {    
            paint=false;
            eraze=false; 
        }
        document.querySelectorAll('.colorplate div').forEach((colorb)=>{
            colorb.addEventListener('click',()=>{ color=colorb.style.backgroundColor;
            document.getElementById('current').style.backgroundColor=color;
           });
        });

        function pick()
        {
            color=document.getElementById('clpick').value;
            document.getElementById('current').style.backgroundColor=color;
        }
        function size(t)
        {
        if(t=="bsize")
            width=document.getElementById('bsize').value;
        else if(t=="esize") 
        {
            side=document.getElementById('esize').value;
            canvaCont.removeChild(erz);
            createEraser();
        }
        }
        function clearCanvas()
        {
            cnt.clearRect(0,0,cv.width,cv.height);
            cnt.fillStyle="white";
            cnt.fillRect(0,0,rect.right,rect.bottom);
        }
        function saveImg()
        {
            console.log('saving....');
            const link=document.createElement('a');
            link.download='${Date.now()}.jpg';
            link.href=cv.toDataURL();
            link.click();
            console.log("saved");
        }
        function active(t)
        {        
          if(t=='brush')
          {
            if(tool=="erazer")
            {
              canvaCont.removeChild(erz);
              if(drop2.style.display=="block")
                drop2.style.display="none";
              tool="brush";
            }
            else
            {
              if(drop1.style.display=="block")
                drop1.style.display="none";
              else 
                drop1.style.display="block";
            }
          }
          else
          {
            if(tool=="brush")
            { 
                if(drop1.style.display=="block")
                drop1.style.display="none";
               tool="erazer";
               side=50;
               createEraser();
            }
             if(drop2.style.display=="block")
                drop2.style.display="none";
              else 
                drop2.style.display="block";

          }
        }
        function set()
        {
            console.log("settt");
            drop.style.display="none";
        }
        function createEraser()
        {
             erz=document.createElement('div');
             erz.classList.add('eraser');
             erz.style.width=side+"px";
             erz.style.height=side+"px";
             erz.addEventListener('mousedown',start);
             erz.addEventListener('mousemove',move);
             erz.addEventListener('mouseup',stop);
             canvaCont.appendChild(erz);
        }