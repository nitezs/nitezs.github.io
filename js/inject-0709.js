const post=document.getElementById("post");if(post){let e=document.createElement("div"),t=(e.innerHTML='<a class="hl-label blue" href="/donate">点这里可以不花钱支持本站！</a><br />如无特殊说明，解压密码为 <span class="hl-label blue">nite07.com</span>(旧) 或者 <span class="hl-label blue">nite07</span>(新)<br />海外用户可以将下载链接中的 <span class="hl-label blue">/cn/</span> 改为 <span class="hl-label blue">/ww/</span> 使用海外服务器下载<br />apks格式文件需要用MT管理器安装',e.style.position="relative",e.style.margin="2rem 0 .5rem",e.style.padding=".5rem .8rem",e.style.border="1px solid var(--light-grey)",e.style.transition="box-shadow .3s ease-in-out",post.getElementsByClassName("post-copyright")[0]);t&&post.insertBefore(e,t)}if(null!=window.localStorage.WALINE_USER&&null!=window.localStorage.WALINE_USER){const c=document.querySelectorAll(".hide-content"),d=document.querySelectorAll(".hide-fake");for(var i=0;i<d.length;i++)d[i].remove();for(i=0;i<c.length;i++)c[i].style.display="block"}else{const e=document.querySelectorAll(".hide-content");for(i=0;i<e.length;i++)e[i].remove()}const toc=document.querySelector("#card-toc");if(null!=toc){const f=document.querySelector("#ad"),g=document.querySelector(".sticky_layout");g.appendChild(f),document.querySelector(".olinks").remove()}const ads=document.querySelector(".adsbygoogle"),nogg=document.querySelector("#nogg");if(window.setTimeout(()=>{0==ads.clientHeight?(btf.snackbarShow("博客运营不易，本站广告不影响体验，请不要屏蔽本站广告"),nogg.style.display="inline"):document.documentElement.clientWidth<=768?btf.snackbarShow("帮我点点广告吧❤"):btf.snackbarShow("帮我点点右侧栏里的广告吧❤")},1e3),document.documentElement.clientWidth<=768){const h=document.querySelector(".aside-content"),j=document.querySelector(".layout");j.parentElement.insertBefore(h,j)}window.onresize=function(){var e=document.querySelector(".aside-content");const t=document.querySelector(".layout");document.querySelector(".recent-posts");document.documentElement.clientWidth<=768?t.parentElement.insertBefore(e,t):t.appendChild(e)};const bq=document.querySelector(".post-copyright");null!=bq&&bq.remove();