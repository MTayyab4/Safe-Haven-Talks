
  const fetchIncludes = async () => {
    const responses = await Promise.all([
      fetch('../banner/banner1.html'),
      fetch('../banner/banner2.html'),
      fetch('../banner/banner3.html'),
      fetch('../banner/banner4.html'),
      fetch('../banner/banner5.html'),
      fetch('../banner/banner6.html'),
      fetch('../banner/banner7.html'),
      fetch('../banner/banner8.html'),
      fetch('../banner/banner9.html'),
      fetch('../banner/banner10.html')
    ]);
    const htmls = await Promise.all(responses.map(response => response.text()));
    document.getElementById('includedContent1').innerHTML = htmls[0];
    document.getElementById('includedContent2').innerHTML = htmls[1];
    document.getElementById('includedContent3').innerHTML = htmls[2];
    document.getElementById('includedContent4').innerHTML = htmls[3];
    document.getElementById('includedContent5').innerHTML = htmls[4];
    document.getElementById('includedContent6').innerHTML = htmls[5];
    document.getElementById('includedContent7').innerHTML = htmls[6];
    document.getElementById('includedContent8').innerHTML = htmls[7];
    document.getElementById('includedContent9').innerHTML = htmls[8];
    document.getElementById('includedContent10').innerHTML = htmls[9];
  };
  fetchIncludes();
  
  
  
  
  