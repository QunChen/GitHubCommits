var baseUrl = "https://api.github.com"

Vue.use(VueResource);

new Vue({
    el:"#demo",
    data:{
        repos:[],
        currentRepo:'',
        commits:null,
        user:''
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