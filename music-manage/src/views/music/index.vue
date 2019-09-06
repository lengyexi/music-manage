<template>
    <el-container>
      <el-header class='m-header'>
        <div>
          <span>欢迎：{{username}}</span>
          <el-button type="primary" size='mini' @click='quit'>退出</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>
          <el-button @click='open'>添加</el-button>
          <!-- 表格 -->
          <el-table
              :data="musiclist"
              style="width: 100%">
              <el-table-column
                label="序号"
                type='index'>
              </el-table-column>
              <el-table-column
                label="歌名"
                prop="music_name">
              </el-table-column>
              <el-table-column
                label="图片">
                  <template slot-scope='text'>
                    <img :src="text.row.pic" alt="" class='m-img'>
                  </template>
              </el-table-column>
              <el-table-column
                label="歌手"
                prop="singer_name">
              </el-table-column>
              <el-table-column
                label="是否上架">
                  <template slot-scope='scope'>
                    <span>{{scope.row.isup == 1?'是':'否'}}</span>
                  </template>
              </el-table-column>
              <el-table-column
                label='操作'
                align="right">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="edit(scope.row.id)"
                    >修改</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="del(scope.row.id)">删除</el-button>
                </template>
              </el-table-column>
           </el-table>
          <!-- 表格结束 -->
          <el-pagination 
            background
            layout="prev, pager, next"
            :total="total"
            :page-size='limit'
            @current-change="pageChange">
          </el-pagination>
          <!-- 弹框 -->
          <el-dialog
              title="提示"
              :visible.sync="dialogVisible"
              width="30%">
              <el-form  :model="music" ref="ruleForm" label-width="100px"  class="demo-ruleForm m-form">
                <el-form-item label="歌名" prop="music_name">
                    <el-input type='text' v-model='music.music_name' ></el-input>
                </el-form-item>
                <el-form-item label="歌手" prop="singer_name">
                    <el-input type="text" autocomplete="off" v-model='music.singer_name'></el-input>
                </el-form-item>
                <el-form-item label="上传图片" prop="pass">
                    <input type="file" @change='upload' ref='files'>
                    <img :src="music.pic" alt="">
                </el-form-item>
                <el-form-item label="是否上架" prop="pass">
                        <el-radio-group v-model="music.isup">
                          <el-radio label="1">是</el-radio>
                          <el-radio label="0">否</el-radio>
                        </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="operate">{{editId?'修改':'添加'}}</el-button>
                </el-form-item>
             </el-form>
          </el-dialog>
          <!-- 弹框结束 -->
        </el-main>
      </el-container>
    </el-container> 
</template>

<script>
  import {mapState,mapMutations} from 'vuex'
export default {
    data() {
      return {
        musiclist:[],
        dialogVisible:false,
        music:{
          music_name:"",
          singer_name:"",
          pic:"",
          isup:"1"
        },
        limit:3,
        pagenum:1,
        total:0,
        editId:''
      }
    },
    created() {
      this.$api.user.getInfo().then(res=>{
        if(res.data.code === 1) {
          this.setName(res.data.data.username)
        }
      })
      this.getMusicList()
    },
    methods:{
      ...mapMutations(['setName']),
      getMusicList(){
          this.$api.music.querymusic({pagenum:this.pagenum,limit:this.limit}).then(res=>{
         if(res.data.code === 1) {
           console.log(res.data.total);
          this.musiclist = res.data.data
          this.total = res.data.total
        }
      })
      },
      quit(){
          this.$confirm('确认退出嘛?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$message({
                type: 'success',
                message: '退出成功!'
              });
              localStorage.removeItem('token')
              this.$router.push('/login')
            })
      },
      upload(e){
        let file = e.target.files[0]
        //新建formate实例
        let formate = new FormData()
        //添加参数
        formate.append('file',file)
          // 请求图片接口
          this.$api.music.upload(formate).then(res=>{
            console.log(res);
            if(res.data.code === 1) {
                this.music.pic = 'http://localhost:3000'+res.data.url
            }
          })
          this.$refs.files.value = ''
      },
      open(){
          this.reset()
          this.dialogVisible = true
      },
      //操作 添加歌曲 和  修改歌曲  根据editId
      operate(){
          if(this.editId){
            this.update()
          }else{
            this.add()
          }
      },
      //添加歌曲
      add(){
        this.$api.music.add(this.music).then(res=>{
          if(res.data.code === 1 ) {
              this.dialogVisible = false
              this.$message({
                        message: '添加成功',
                        type: 'success'
                    });
              this.getMusicList()
          }
        })
      },
      //修改歌曲
      update(){
        this.$api.music.update({...this.music,id:this.editId}).then(res=>{
            this.dialogVisible = false
              this.$message({
                        message: '修改成功',
                        type: 'success'
                    });
              this.getMusicList()
        })
      },
      pageChange(val){
            this.pagenum = val
            this.getMusicList()
      },
      //删除歌曲
      del(id){
        this.$confirm('确认退出嘛?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$api.music.del({id}).then(res=>{
                console.log(res);
                if(res.data.code === 1) {
                      this.$message({
                              message: '删除成功',
                              type: 'success'
                          });
                      this.getMusicList()
                }
              })
            })
        
      },
      reset(){
          this.music.music_name = ''
          this.music.singer_name = ''
          this.music.isup = '1'
          this.music.pic = ''
          this.editId=''
      },
      edit(id){
        this.dialogVisible= true;
        this.editId = id;
        let editObj = this.musiclist.find(item => item.id === id)
        this.music.music_name = editObj.music_name
        this.music.singer_name = editObj.singer_name
        this.music.isup = editObj.isup
        this.music.pic = editObj.pic
      }
    },
    computed:{
      ...mapState({
        username:state=> state.user.username
      })
    }
}

</script>

<style scoped>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    /* text-align: center; */
    line-height: 60px;
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    /* line-height: 160px; */
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .m-header{
    text-align: right;
  }
  .m-img{
    width: 80px;
    height: 80px;
  }
</style>