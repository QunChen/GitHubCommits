var baseUrl = "https://api.github.com"

Vue.use(VueResource);

Vue.component('githubReport',{
    template:` <div id="demo">

    <div v-show="!user">
    <label for="user_input">Please fill a username in GitHub</label>
    <input type="text" v-model="user" id="user_input" lazy debounce="1000">
    </div>

    <div v-show="user">
    <h2>{{user}}'s Apps in GitHub</h2>
              <br>
              <button @click="choose">Choose a user</button>
              <br>
              <template v-for="repo in repos | orderBy 'name' ">
              <input type="radio" v-model="currentRepo" :id="repo.name" :value="repo.name">
              <label :for="repo.name">{{repo.name}}</label>
              </template>
              <p>{{user}}/{{currentRepo}}</p>

              <ul>
              <li v-for="record in commits">
              <a :href="record.html_url" target="_blank" class="commit">{{record.sha.slice(0, 7)}}</a>
    - <span class="message">{{record.commit.message | truncate}}</span><br>
    by <span class="author">{{record.commit.author.name}}</span>
    at <span class="date">{{record.commit.author.date | formatDate}}</span>
        </li>
        </ul>
        </div>
        </div>`,
    data:function(){
    return{
        repos:[],
        currentRepo:'',
        commits:null,
        user:''
              }
    },
    http: {
        root: baseUrl
    },
    watch:{
        currentRepo:'fetchCommits',
        user:'fetchRepos'
    },
    methods:{
        choose:function(){
            this.user='';
            this.repos=[];
            this.currentRepo="";
            this.commits=null;
        },
        fetchCommits:function(){
            var commit_resource = this.$resource('repos/{user}/{repo}/commits');
            commit_resource.get({repo:this.currentRepo,user:this.user}).then((response)=>{
                this.commits=response.data; 
            },(response)=>{
                console.log(response.status+": "+response.statusText)
            });
        },
        fetchRepos:function(){
            var repo_resource = this.$resource('users/{user}/repos');
            repo_resource.get({user:this.user}).then((response)=>{
                this.repos=response.data; 
            },(response)=>{
                console.log(response.status+": "+response.statusText)
            });
        }
    }
})