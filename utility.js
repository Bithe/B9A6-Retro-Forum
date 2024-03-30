let countReadPost = 0;
let data;

// LOAD ALL POSTS
const loadAllPosts = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/posts"
  );

  data = await res.json();
  // console.log(data);
  displayAllPosts(data);
};

const displayAllPosts = (data) => {
  const postsContainer = document.getElementById("posts-container");
  postsContainer.textContent = "";
  data.posts.forEach((post) => {
    const postDiv = document.createElement("div");
    postDiv.classList.add("show-data");

    postDiv.innerHTML = `
    <div class="p-8 flex gap-8 border rounded-3xl">

  

    <div class="avatar indicator">
    <span class="indicator-item badge rounded-full" style="${
      post.isActive === true
        ? "background-color: green;"
        : "background-color: red; "
    }"></span>
    <div class="w-20 h-20 rounded-lg">
      <img alt="Tailwind CSS examples" src="${post.image}" />
    </div>
  </div>

    
    <div class="content">
        <div class="flex gap-8 font-bold text-base">
            <p>#${post.category}</p>
            <p>Author : ${post.author.name}</p>
        </div>
        <h3 class="text-xl font-bold ">${post.title}</h3>
        <p class="text-gray-500">${post.description}</p>
        <hr class="border-dashed border-gray-300 h-0 w-full self-center my-3">


        <!-- icons starts-->
        <div class="flex justify-between ">
            <div class="space-x-5 text-gray-500">
                <i class="fa-regular fa-eye"></i> ${post.comment_count}
                <i class="fa-regular fa-eye"> </i> ${post.view_count}
                <i class="fa-regular fa-eye"></i> ${post.posted_time} min

            </div>

            <div>
                <button onclick="readPostsShow('${post.title.replace(
                  /'/g,
                  "\\'"
                )}', ${
      post.view_count
    })" class="read-btn"> <img src="images/email.png"
                alt="">
                </button>
            </div>

        </div>
        <!-- icons ends-->


    </div>
</div>

    `;

    postsContainer.appendChild(postDiv);
  });

  // const category = data.posts.category;
  // console.log(category);
  // searchData(category);
};
loadAllPosts();
// ALL POST SHOW ENDS ON THE LEFT

// BY CLICKING SHOW THE POST ON THE RIGHT SIDE STARTS
const readPostsShow = async (postTitle, postCount) => {
  countReadPost++;
  const postReadCount = document.getElementById("post-read-counts");
  postReadCount.innerText = countReadPost;

  const readPostContainer = document.getElementById("read-posts-container");

  const readPostDiv = document.createElement("div");
  readPostDiv.innerHTML = `
            <div class="flex gap-2 justify-center items-center bg-white p-4 rounded-3xl">
                <div class="flex-1">

                    <h3 class="text-xl font-bold ">${postTitle} </h3>
                </div>

                            <div class="space-x-5 text-gray-500 flex justify-center items-center">
                                <i class="fa-regular fa-eye"></i>
                                <div>${postCount}</div>

                            </div>


                        </div>`;

  readPostContainer.appendChild(readPostDiv);
};
// BY CLICKING SHOW THE POST ON THE RIGHT SIDE ENDS

// SEARCH POSTS STARTS

const searchData = () => {
  toggleLoadingSpinner(true);

  const searchInputField = document
    .getElementById("search-input")
    .value.toLowerCase();

  const searchResults = data.posts.filter((post) =>
    post.category.toLowerCase().includes(searchInputField)
  );

  if (searchInputField === "" || searchResults.length === 0) {
    document.getElementById("no-post-error").innerText = "No Post Found";
    const postsContainer = document.getElementById("posts-container");
    postsContainer.textContent = "";
    toggleLoadingSpinner(false); 
    return; 
  }

  const categoryExists = searchResults.some(
    (post) => post.category.toLowerCase() === searchInputField
  );
if(categoryExists){
  document.getElementById("no-post-error").innerText = "";

}

  if (!categoryExists) {
    document.getElementById("no-post-error").innerText =
      "Post does not exist";
    const postsContainer = document.getElementById("posts-container");
    postsContainer.textContent = "";
    toggleLoadingSpinner(false); 
    return; 
  }

  console.log(searchResults);
  
  displayBySearch(searchResults);
};

const displayBySearch = (searchResults) => {
  const postsContainer = document.getElementById("posts-container");
  postsContainer.textContent = "";
  searchResults.forEach((post) => {
    const postDiv = document.createElement("div");
    postDiv.classList.add("show-data");

    postDiv.innerHTML = `
    <div class="p-8 flex gap-8 border rounded-3xl">
    <div class="avatar indicator">
    <span class="indicator-item badge rounded-full" style="${
      post.isActive === true
        ? "background-color: green;"
        : "background-color: red; "
    }"></span>
    <div class="w-20 h-20 rounded-lg">
      <img alt="Tailwind CSS examples" src="${post.image}" />
    </div>
  </div>

    
    <div class="content">
        <div class="flex gap-8 font-bold text-base">
            <p>#${post.category}</p>
            <p>Author : ${post.author.name}</p>
        </div>
        <h3 class="text-xl font-bold ">${post.title}</h3>
        <p class="text-gray-500">${post.description}</p>
        <hr class="border-dashed border-gray-300 h-0 w-full self-center my-3">


        <!-- icons starts-->
        <div class="flex justify-between ">
            <div class="space-x-5 text-gray-500">
                <i class="fa-regular fa-eye"></i> ${post.comment_count}
                <i class="fa-regular fa-eye"> </i> ${post.view_count}
                <i class="fa-regular fa-eye"></i> ${post.posted_time} min

            </div>

            <div>
                <button onclick="readPostsShow('${post.title.replace(
                  /'/g,
                  "\\'"
                )}', ${
      post.view_count
    })" class="read-btn"> <img src="images/email.png"
                alt="">
                </button>
            </div>

        </div>
        <!-- icons ends-->


    </div>
</div>

    `;

    postsContainer.appendChild(postDiv);
  });

  // const category = data.posts.category;
  // console.log(category);
  // searchData(category);
};
// SEARCH POSTS ENDS

// LATEST POSTS STARTS
const loadLatestPostData = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/latest-posts"
  );
  const data = await res.json();
  // console.log(data);
  displayLatestPostData(data);
};
loadLatestPostData();

const displayLatestPostData = (data) => {
  const latestPostContainer = document.getElementById(
    "latest-post-card-container"
  );

  data.forEach((data) => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card", "w-96", "bg-base-100", "shadow-xl");

    cardDiv.innerHTML = `
    
          <figure class="p-8 rounded-xl"><img class="rounded-xl"
          src="${data.cover_image}" alt="Shoes" />
      </figure>

      <div class="card-body">

      <div class="flex gap-4 justify-center items-center">
      <i class="fa-regular fa-calendar"></i>

      <p class="text-gray-500">${
        data.author.posted_date ? data.author.posted_date : "No publish date"
      }</p>

      </div>
      <h2 class="card-title font-extrabold">
          ${data.title}
      </h2>
      <p class="text-gray-500">${data.description}</p>
      <div class="card-actions gap-8 items-center">

          <div class="w-10 h-full"><img class="rounded-full" src="${
            data.profile_image
          }" alt=""></div>
          <div class="">
              <p class="font-bol">${data.author.name}</p>
              <p class="text-gray-500"> ${
                data.author.designation ? data.author.designation : "Unknown"
              }</p>
          </div>
      </div>
      </div>
    `;

    latestPostContainer.appendChild(cardDiv);
  });
};
// LATEST POSTS ENDS

// LOADING SPINNER

const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
    
    setTimeout(() => {
      loadingSpinner.classList.add("hidden");

    }, 2000);

  } 

  else{
    loadingSpinner.classList.add("hidden");

  }
};


