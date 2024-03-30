let countReadPost = 0;

//
const loadAllPosts = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/posts"
  );

  const data = await res.json();
  // console.log(data);
  displayAllPosts(data);
}

const displayAllPosts = (data) =>{

  data.posts.forEach((post) => {
    const postsContainer = document.getElementById("posts-container");

    const postDiv = document.createElement("div");
    postDiv.classList.add("show-data");

    postDiv.innerHTML = `
    <div class="p-8 flex gap-8 border rounded-3xl">

    <div class="w-24 h-full">
    <img class="rounded-2xl" src="${post.image}" alt="">
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

const searchData = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/posts"
  );

  const data = await res.json();

  const category = data.posts.category;
  // console.log(data);
  const searchInput = document.getElementById("search-input").value;

  // Clear existing posts
  const postsContainer = document.getElementById("posts-container");
  postsContainer.innerHTML = "";

  // If searchInput matches the category, display posts of that category
  if (searchInput === category) {
    data.posts.forEach((post) => {
      if (post.category === category) {
        const postDiv = document.getElementById("div");
        postDiv.classList = "p-8 flex gap-8 border rounded-3xl";

        postDiv.innerHTML = `
          <div class="w-24 h-full"><img src="${post.image}" alt=""></div>
          <div class="content">
            <div class="flex gap-8 font-bold text-base">
              <p>#${post.category}</p>
              <p>Author: ${post.author.name}</p>
            </div>
            <h3 class="text-xl font-bold">${post.title}</h3>
            <p class="text-gray-500">${post.description}</p>
            <hr class="border-dashed border-gray-300 h-0 w-full self-center my-3">
            <div class="flex justify-between">
              <div class="space-x-5 text-gray-500">
                <i class="fa-regular fa-eye"></i> ${post.comment_count}
                <i class="fa-regular fa-eye"></i> ${post.view_count}
                <i class="fa-regular fa-eye"></i> ${post.posted_time} min
              </div>
              <div>
                <button onclick="readPostsShow('${post.title.replace(
                  /'/g,
                  "\\'"
                )}', ${post.view_count})" class="read-btn">
                  <img src="images/email.png" alt="">
                </button>
              </div>
            </div>
          </div>
        `;

        postsContainer.appendChild(postDiv);
      }
    });
  }
};

// SEARCH POSTS ENDS

// LATEST POSTS STARTS
const loadLatestPostData = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/latest-posts"
  );
  const data = await res.json();
  console.log(data);
  displayLatestPostData(data);

};
loadLatestPostData();

const displayLatestPostData = (data) =>{
  
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

      <p>${data.author.posted_date ? data.author.posted_date : "No publish date"}</p>

      </div>
      <h2 class="card-title">
          ${data.title}
      </h2>
      <p>${data.description}</p>
      <div class="card-actions gap-8 items-center">

          <div class="w-10 h-full"><img class="rounded-full" src="${data.profile_image}" alt=""></div>
          <div class="">
              <p>${data.author.name}</p>
              <p> ${data.author.designation ? data.author.designation : "Unknown"}</p>
          </div>
      </div>
      </div>
    `;

    latestPostContainer.appendChild(cardDiv);
  });
}

// LATEST POSTS ENDS
