/** select light mode **/
const darkIcon = document.querySelector('.dark_icon');
const lightIcon = document.querySelector('.light_icon');
//로컬 저장소에서 저장된 값 찾기
const isUserColorTheme = localStorage.getItem('color-theme');
//로컬 저장소에 없을 경우 시스템 설정을 기준으로 한다
const isOsColorTheme = window.matchMedia('prefers-color-scheme: dark').matches ? 'dark' : 'light';
const presentTheme = () => (isUserColorTheme ? isUserColorTheme : isOsColorTheme);
//chekcboxex for localstorage
const checkboxes = document.getElementsByName('checkList').length;

/*** window.onload lightness mod setting & API call ***/
  window.onload = function(){
  /* saving API url */
    //weather API
    const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=13.736717&lon=100.523186&appid=fca7b6ecde13fa2d4e140006f768fd79&units=metric';
    //exchange rate API
    const exchageUrl = 'https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWTHB';
    //diplomat notice API
    const diplomatSafteyUrl = 'https://apis.data.go.kr/1262000/CountrySafetyService3/getCountrySafetyList3?serviceKey=RHh9qBtKX0nX7AHYN9wc37tOXdekXhwz8L07fm3vc3rReNkBkkWM6YUaB0Eo3YDEiN7rRKN4mTfwePoyCFFUZA%3D%3D&returnType=JSON&numOfRows=2&cond[country_iso_alp2::EQ]=TH&pageNo=1';
    //diplomat flag API
    const flagUrl = 'https://apis.data.go.kr/1262000/CountryFlagService2/getCountryFlagList2?serviceKey=RHh9qBtKX0nX7AHYN9wc37tOXdekXhwz8L07fm3vc3rReNkBkkWM6YUaB0Eo3YDEiN7rRKN4mTfwePoyCFFUZA%3D%3D&returnType=JSON&numOfRows=1&cond[country_iso_alp2::EQ]=TH&pageNo=1'

  /** initializing lightness mode **/
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

  /** APIs**/
    /* weather */
    fetch(weatherUrl)
      .then((res) => res.json())
      .then((myJson) => {
        //console.log(myJson);
        const weatherIcon = document.getElementById("weatherIcon");
        const weatherIconId = myJson.weather[0].icon;

        document.getElementById("wCountry").innerText = myJson.sys.country;
        document.getElementById("wCity").innerText = myJson.name;
        document.getElementById("weather").innerText = myJson.weather[0].main;
        document.getElementById("temperature").innerText = myJson.main.temp;
        document.getElementById("humidity").innerText = myJson.main.humidity;

        weatherIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + weatherIconId + "@2x.png");
      });
    /* exchange rate */
    fetch(exchageUrl)
      .then((res) => res.json())
      .then((myJson) => {
        //console.log(myJson[0]);
        const fxData = myJson[0];
        const fxUnit = fxData.currencyCode;
        
        document.getElementById("fxDate").innerText = fxData.date;
        document.getElementById("baseRate").innerText = `${fxData.basePrice.toString()} ${fxUnit}`;
        document.getElementById("fxBuying").innerText = `${fxData.cashBuyingPrice.toString()} ${fxUnit}`;
      });
    /* diplomat saftey notice */
    fetch(diplomatSafteyUrl)
      .then((res) => res.json())
      .then((myJson) => {
        //console.log(myJson);
        document.getElementById("noticeCountry").innerText = myJson.data[0].country_nm
        ;
        for(i = 0; i < myJson.data.length; i++){
          //console.log(myJson.data[String(i)]);
          document.getElementById("dSafetyTitle" + i).innerText = myJson.data[i].title;
          document.getElementById("warning" + i).innerText = myJson.data[i].ctgy_nm;
          document.getElementById("dSafetyDate" + i).innerText = myJson.data[i].wrt_dt;
          if(myJson.data[i].ctgy_nm == '주의'){
            document.getElementById("warning" + i).classList.add('red_btn')
          } else if (myJson.data[i].ctgy_nm == '안내'){
            document.getElementById("warning" + i).classList.add('green_btn')
          } else {
            document.getElementById("warning" + i).classList.add('')
          }
        }
      });
      /* flag */
      fetch(flagUrl)
      .then((res) => res.json())
      .then((myJson) => {
        console.log(myJson);
        const flagIcon = document.getElementById("flagIcon");

        flagIcon.setAttribute("src", "https://opendata.mofa.go.kr:8444/fileDownload/images/country_images/flags/214/20220318_170222070.gif");
      });
  }
/** 아이콘 클릭에 따른 상대 라이트&다크 모드 전환 **/
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

/**mobile_menu**/
  /*mobile_menu_toggle*/
  $(".mobile_list").click(function(){
    $(".mobile_menu").fadeToggle(200)
  });
  /*arcordian_menu*/
  $(".mobile_menu_list").click(function(){
    $(this).children('ul').slideToggle(200);
    $(".mobile_menu_list").children('ul').not($(this).children('ul')).slideUp(200);
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
  })
  /* checkbox_localstorage */
  // to save 
  function toSave() {
    for (let i = 1; i <= checkboxes; i++){
      const checkbox = document.getElementById('list' + String(i));
      localStorage.setItem('list' + String(i), checkbox.checked);
    }
  }
  // to load just using vanilla JS
  for(let i = 1; i <= checkboxes; i++){
    if(localStorage.length > 0){
      const checkedContent = document.getElementById('list' + String(i)).nextElementSibling;
      let checked = document.getElementById('list' + String(i)).checked = JSON.parse(localStorage.getItem('list' + String(i)));
      if (checked) checkedContent.classList.add('strikethrough')
    }
  }
/* saving event */ 
  window.addEventListener('change', toSave);  

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





  

  

