

    //定义 根组件
    let App = {
    template: `
      <div>
        <header class="header">XX后台管理系统</header>

        <div class="main">      
          <div class="content left">
            <ul>
              <li> <router-link to="/users">用户管理</router-link> </li>
              <li> <router-link to="/goods">商品管理</router-link></li>
              <li>订单管理</li>
            </ul>
          </div>
          <div class="content right">
            <div class="main-content"> 
                <router-view></router-view> 
            </div>
          </div>
        </div>

        <footer class="footer">版权信息</footer>
      </div>`
}


    //定义一个用户管理组件
    let Users = {
        data(){
            return {
                list:[]
            }
        },
        created(){
            //获取列表
            let api = "http://localhost:3001/user/list"
            axios.get(api).then(res=>{
                console.log("用户列表： ",res.data)
                this.list = res.data
            })
        },
        template: `
            <div>
            <router-view></router-view>
            <table>
                <thead>
                    <tr><th>用户ID</th><th>用户名</th><th>Email</th><th>操作</th></tr>
                </thead>
                <tbody>
                    <tr v-for="item in list" :key="item.user_id">
                        <td>{{ item.user_id }}</td>
                        <td>{{ item.user_name }}</td>
                        <td>{{ item.email }}</td>
                        <td>
                            <router-link :to="{path:'/user/info/'+item.user_id}">详情</router-link> | 
                            <a href="">删除</a> 
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>
        `
    }

    //用户详情组件
    let UserInfo = {
        template:`<div>用户详情</div>`
    }

    //定义商品管理组件
    let Goods = {
        template: `<h2>商品管理组件</h2>`
    }
    //定义路由与组件的对应关系
    let routes = [
        {path:"/",redirect:"/users",component:App,children:[
            {path:"/users",component:Users,children:[
                    {path:"/user/info/:id",component:UserInfo}
                ]},
            {path:"/goods",component:Goods},
        ]},

    ]

    //实例化 VueRouter
    let router = new VueRouter({
        routes
    })


    //实例化Vue
    new Vue({
    el: "#app",
    router:router
})