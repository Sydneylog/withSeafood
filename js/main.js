/**service_worker**/


/** select light mode **/
const darkIcon = document.querySelector('.dark_icon');
const lightIcon = document.querySelector('.light_icon');
//로컬 저장소에서 저장된 값 찾기
const isUserColorTheme = localStorage.getItem('color-theme');
//로컬 저장소에 없을 경우 시스템 설정을 기준으로 한다
const isOsColorTheme = window.matchMedia('prefers-color-scheme: dark').matches ? 'dark' : 'light';
const presentTheme = () => (isUserColorTheme ? isUserColorTheme : isOsColorTheme);
window.onload = function(){
  if(presentTheme == 'dark'){
    localStorage.setItem('color-theme', 'dark');
    document.documentElement.setAttribute('color-theme', 'dark');
    darkIcon.style.display = 'block';
    lightIcon.style.display = 'none';
  } else {
    localStorage.setItem('color-theme', 'light');
    document.documentElement.setAttribute('color-theme', 'light');
    darkIcon.style.display = 'none';
    lightIcon.style.display = 'block';
  }
}

//아이콘에 따른 상대 모드로 전환
darkIcon.addEventListener('click', e => {
  if (darkIcon.style.display == 'block'){
    document.documentElement.setAttribute('color-theme', 'light');
    darkIcon.style.display = 'none';
    lightIcon.style.display = 'block';
  } 
});
lightIcon.addEventListener('click', e => {
  if (lightIcon.style.display == 'block'){
    document.documentElement.setAttribute('color-theme', 'dark');
    darkIcon.style.display = 'block';
    lightIcon.style.display = 'none';
  } 
});

/* mode-local storage */











/**mobile_menu**/
/*mobile_toggle*/
$(".mobile_list").click(function(){
  $(".mobile_menu").fadeToggle()
});
/*arcordian_menu*/
$(".mobile_menu_list").click(function(){
  $(this).children('ul').slideToggle();
});
/*width-recognition*/
$(window).resize(function(){
  const windowWidth = $(window).width();
  if (windowWidth >= 768) {
    $(".mobile_menu legend").addClass("blind");
    $(".mobile_menu").show();
  } 
  if (windowWidth < 768) {
    $(".mobile_menu legend").removeClass("blind");
    $(".mobile_menu").hide();
  }
});

/** check_list **/
/* strikethrough */
$("input[name='checkList']").click(function(){
  $(this).next().toggleClass('strikethrough');
})
$("input[name='checkList']").click(function(){
  if($(this).is(":checked")){
    confirm("해당 체크리스트를 삭제 하시겠습니까?")
  }
}
)
/* sotry_card */
/* lazyload */











/** bottom_menu **/ 
/* width-recognition */
$(window).resize(function(){
  const windowWidth = $(window).width();
  if (windowWidth >= 768) {
    $(".bottom_menu_wrap").slideUp(0);
  } else{
    $(".bottom_menu_wrap").slideDown(0);
  }
});
/* height-recognition */
$(window).scroll(function(){
  const windowWidth = $(window).width();
  const scrollHeight = $(window).scrollTop();
  if (scrollHeight > 80 && windowWidth < 768) {
    $(".bottom_menu_wrap").slideDown(0);
  } else {
    $(".bottom_menu_wrap").slideUp(0);
  }
})
