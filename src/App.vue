<template>
  <div id="app">
    <div id="nav">
        <div>
          <el-menu class="el-menu-demo flex" mode="horizontal" 
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b">
              <div class="main-menu flex space-between">
                <div class="flex">
                  <img class="img-app" src="/img/app/logo-50x50.png" />
                  <div class="hamburger" @click="doToggle">
                        <div class="span"></div>
                        <div class="span"></div>
                        <div class="span"></div>
                  </div>
                  <div class="container-nav"  ref="nav">                   
                    <router-link  to="/"><el-menu-item @click.native="doToggle" index="1">Home</el-menu-item></router-link>
                    <router-link  to="/parking"><el-menu-item @click.native="doToggle" index="2">Find</el-menu-item></router-link>
                    <router-link to="/parking/add"><el-menu-item @click.native="doToggle" index="3">add parking</el-menu-item></router-link> 
                    <router-link v-if="!loggedInUser._id" to="/login"><el-menu-item @click.native="doToggle" index="4">Login</el-menu-item></router-link>
                    <router-link v-if="loggedInUser._id" :to="`/user/${loggedInUser._id}`"><el-menu-item @click.native="doToggle" index="5">my parkings</el-menu-item></router-link>
                    <div class="logout" v-if="loggedInUser._id" @click="logout"><el-menu-item @click.native="doToggle"  index="6">Logout</el-menu-item></div>
                  </div>      
                </div>
                  <router-link class="btn-profile" :to="`/user/${loggedInUser._id}`">
                    <button  v-show="loggedInUser.firstName" class="profile-icon">{{nameInitials}}</button>
                  </router-link>     
                </div> 
           </el-menu>
          </div> 
    </div>
    <router-view/>  
  </div>

</template>


<script>
export default {
  data () {
    return {
      block:true
    }
  },
  created() {
    this.$root.demoDummyNotify = true;
  },
  computed: {
    loggedInUser(){
      return this.$store.getters.loggedInUser
    },
    nameInitials() {
      return this.loggedInUser.firstName.charAt(0) + this.loggedInUser.lastName.charAt(0)
    }
  },

  methods: {
    
    doToggle(){
      this.$refs.nav.classList.toggle('active')
      
    },
    
    logout() {
      this.$store.commit({type:'logoutUser'})
      localStorage.removeItem('loggedInUser')
      this.$router.push('/login')

    },
  }
  
}

</script>


<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  font-size: 15px;
}
#nav {
  position: fixed;  
  width: 100%;
  opacity: 0.9;
  z-index: 2000;
  top: 0;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }  
}

.logout {
  display: inline;
  font-weight: bold;
  text-decoration: underline;
  &:hover {
    cursor: pointer;
  }
}
.inline-block {
  display: inline-block;
}

.profile-icon {
  border-radius: 50%;
  border: none;
  height: 40px;
  width: 40px;
  margin-right: 10px;
  text-transform: uppercase;
  outline: none;
  &:hover {
    cursor: pointer;
    background-color: rgba(168, 168, 168, 0.377);
    color: white;
    transition: 0.3s;
  }
} 

.main-menu {
  align-items: center;
  width: 100%;
}

.container-nav {
  display: flex;
  height: auto;
}

.btn-profile {
  position: absolute;
  top: 8.2px;
  right: 10px;
}

@media (max-width: 770px) {
.img-app{
  display: none;
}
  .span {
    width: 35px;
    height: 2px;
    background-color: black;
    margin: 6px 0;
  }
  .hamburger {
    margin-left: 30px;
  }

  .el-menu {
    padding: 3px;
  }


  .main-menu {
    padding: 10px;
    img {
      margin-top: -10px;
    }
  }

  .container-nav {
    opacity: 0;
    visibility: hidden;
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 100%;
    height: 100vh;
    left: 0;
    width: 100vw;
    background-color: rgb(84, 92, 100);;
    transition:visibility 0s linear 0.5s,opacity 0.5s linear;
    background-color: 0;
    padding-right: 0;
  }

  .active {
    visibility: visible;
    opacity: 1;
    transition-delay:0s;
  }
}
</style>
