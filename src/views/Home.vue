<template>
  <section>
    <div class="home flex column justify-content-c">
      <div class="header">
        <h2>Parker - Your Parking Friend!</h2>  
        <p>Wasting too much time finding an available parking?
          Parker helps you find one in just a few clicks!</p>
         <P class="2nd-p">Simply set the preferred area, choose the parking that suits you, 
        and click RESERVE - the parking will be waiting for you!</p>
        <router-link to="/parking"><el-button type="success">Find me a Parking!</el-button></router-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'home', 
}
</script>

<style scoped lang="scss">



.home {
  background: 
  linear-gradient(rgba(255, 255, 255, 0) 30%, rgba(0, 0, 0, 0.62) 90%), 
  linear-gradient(to top, rgba(255, 255, 255, 0) 50%, rgba(0, 0, 0, 0.25) 90%, rgba(0, 0, 0, 0.7) 100%), 
  linear-gradient(to top, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.25) 50%, rgba(0, 0, 0, 0.7) 85%), 
  url('../assets/images/parker.png') 90% center / cover no-repeat;
  height: 100vh;
  width: 100%;  
  background-attachment: fixed;
  background-size: cover;
}


.header{
  color: white;
  text-align: left;
  padding: 50px; 
  font-family: 'Open Sans', sans-serif;
}

 h2 {
    font-size: 48px;
    font-weight: 300;
    text-transform: uppercase;
    line-height: 100%;
    margin-bottom: 20px;
  }

  p {
    margin-bottom: 20px;
    max-width:50%
  }

  @media (max-width: 500px) {
    .header p {
      max-width: 100%;
    }
    .home {
      justify-content: flex-start;
    }
     
  }

</style>