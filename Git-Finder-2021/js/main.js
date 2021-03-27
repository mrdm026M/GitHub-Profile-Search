const API_URL = "https://api.github.com/users/";

const tableBody = document.getElementById("table-body");

const git_search_form = document.getElementById("git-search-form");

git_search_form.addEventListener("submit", function (e) {
  e.preventDefault();

  const search_text = document.getElementById("git-input").value;
  const edit_text = search_text.split(" ").join("");

  // git-user
  fetch(API_URL + edit_text)
    .then((result) => result.json())
    .then((data) => {
      document.getElementById("user-main-data").innerHTML = `
                <div id="git-main-data">
                    <div class="git-info">
                        <div class="user-img">
                            <img src="${data.avatar_url}" alt="">
                        </div>
                        <div class="user-data">
                            <div class="user-data-head">
                                <span>${data.name}</span>
                                <hr>
                                <p>${data.bio}</p>
                            </div>
                            <div class="user-data-2">
                                <ul class="user-info">
                                    <li><strong>Followers : </strong><span>${data.followers}</span></li>
                                    <li><strong>Following : </strong><span>${data.following}</span></li>
                                    <li><strong>Repos : </strong><span>${data.public_repos}</span></li>
                                    <li><strong>Twitter : </strong><span>${data.twitter_username}</span></li>
                                    <li><strong>Location : </strong><span>${data.location}</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            `;
    });

  // repos
  fetch(API_URL + edit_text + "/repos")
    .then((result) => result.json())
    .then((data) => {
      var statusHTML = "";
      Object.keys(data).forEach(function (key) {
        statusHTML += "<tr>";
        statusHTML += "<td>" + data[key].id + "</td>";
        statusHTML += "<td>" + data[key].name + "</td>";
        statusHTML += "<td>" + data[key].html_url + "</td>";
        statusHTML += "<td>" + data[key].language + "</td>";
        statusHTML += "</tr>";
      });
      tableBody.innerHTML = statusHTML;
    });
});
