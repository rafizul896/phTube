const btnContainer = document.getElementById('btnContainer');
const videoContainer = document.getElementById('videoContainer');
const noVideo = document.getElementById('noVideo');
let selectedCategory = 1000;

const fetchCategorie = async () => {
    const url = 'https://openapi.programming-hero.com/api/videos/categories';
    const fetchs = await fetch(url);
    const res = await fetchs.json();
    const data = res.data.forEach((data) => {
        const button = document.createElement('button');
        button.classList = "border py-2 px-5 rounded-md bg-[#25252533] text-black";
        button.innerText = data.category;
        button.addEventListener('click', () => fetchDataByCategories(data.category_id));
        btnContainer.appendChild(button);
    });
}

const fetchDataByCategories = (categoryId) => {
    selectedCategory = categoryId;
    fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
        .then(res => res.json())
        .then(data => videos(data.data))
}

const videos = (data) => {
    videoContainer.innerHTML = '';
    if (data.length === 0){
        noVideo.classList.remove('hidden');
    }
    else{
        noVideo.classList.add('hidden')
    }
    data.forEach((video) => {
        let verified
        if(video.authors[0].verified === true){
            verified = `<img class="w-4 h-4" src="./Design in png/Group 3.png"/>`
        }
        else{
            verified = '';
        }
        const newVideo = document.createElement('div');
        newVideo.innerHTML = `
        <div class="card bg-base-100 shadow-xl h-[300] rounded-md">
        <figure class="h-[200px] rounded-md p-1">
            <img class="object-cover h-full w-full rounded-lg" src="${video.thumbnail}" alt="Shoes" />
            <h6 class="absolute bottom-[38%] lg:bottom-[22%] right-3 text-white text-sm">0 hr</h6>
        </figure>
        <div class="px-2 mt-3">
            <div class="flex gap-4 justify-start items-start">
                <div>
                    <img class="w-12 h-12 rounded-full" src="${video.authors[0].profile_picture}"/>
                </div>
                <div>
                    <h2 class="font-semibold text-lg lg:text-xl">${video.title}</h2>
                    <div class="flex gap-1 mt-2 items-center">
                        <p class="font-normal text-sm">${video.authors[0].profile_name}</p> 
                        ${verified}
                    </div>
                    <p class="my-3 text-xs font-bold">${video.others.views}</p>
                </div>
            </div>
        </div>
    </div>
        `
        videoContainer.appendChild(newVideo)
    })
}

fetchCategorie()
fetchDataByCategories(selectedCategory)