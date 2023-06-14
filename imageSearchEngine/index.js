const searchForm = document.getElementById('search-form');
const searchBox = document.getElementById('search-box');
const searchResult = document.getElementById('search-result');
const showMoreBtn = document.getElementById('show-more-btn');

let keyword = '';
let page = 1;
let accessKey = '5ZhLX7fAuG5Fpv2zDtI36KgMACE-g4Yb9cirb0F-4m4';

async function searchImages() {
  keyword = searchBox.value;
  if (page === 1) {
    searchResult.innerHTML = ''; 
    showMoreBtn.style.display='none';
  }
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  const results = data.results;
  const message = document.getElementById('message');
    if (results.length===0)
    {
    const message=document.createElement('h1');
    message.innerText="Try different Keyword";
    message.id = 'message'; 
    searchResult.appendChild(message);
    message.style.display('block');
    }
  else{

    results.map((result) => {

        const image = document.createElement('img');
        image.src = result.urls.small;
    
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = '_blank';
        imageLink.appendChild(image);
        searchResult.appendChild(imageLink);
      });
      showMoreBtn.style.display='block';}
}

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  page = 1;
  searchImages();
});

showMoreBtn.addEventListener('click',()=>{
page++;
searchImages();
})