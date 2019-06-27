import React,{Component} from 'react';
import './App.css';
import { Layout, Menu, Icon, Button, Input } from 'antd';

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      inputValue:'',
    };
  }
  componentDidMount () {
    var BMap = window.BMap;
    var map = new BMap.Map("allmap"); // 创建Map实例
    map.centerAndZoom(new BMap.Point(114.05 , 22.55), 11); // 初始化地图,设置中心点坐标和地图级别
    map.addControl(new BMap.MapTypeControl()); //添加地图类型控件
    //map.setCurrentCity("深圳"); // 设置地图显示的城市 此项是必须设置的
    map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放


  }

  render(){
    const { Header, Content, Footer, Sider } = Layout;
    return (
      <div>
        <Layout>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={broken => {
              console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
            }}
          >
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
                <Icon type="user" />
                <span className="nav-text">租房子</span>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="video-camera" />
                <span className="nav-text">我的收藏</span>
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="upload" />
                <span className="nav-text">历史记录</span>
              </Menu.Item>
              <Menu.Item key="4">
                <Icon type="user" />
                <span className="nav-text">个人信息</span>
              </Menu.Item>             
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }} />
            <Content style={{ margin: '24px 16px 0' }}>
              <Input 
                onKeyUp={this.onKeyup.bind(this)}
                value={this.state.inputValue}
                onChange={this.handleInputChange.bind(this)}
                placeholder = '查找城市、房源、租户' 
                style={{width:'300px', margin:'10px'}}
              />
              <Button type='primary' onClick={this.handleBtnClick.bind(this)} >搜索</Button>
              <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                <div id='allmap' style={{height:500}} />
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Provide a better rental experience</Footer>
          </Layout>
        </Layout>
      </div>
    );
 }
handleInputChange(e) {
  this.setState({
    inputValue:e.target.value
  })
}

handleBtnClick(){
  var BMap = window.BMap;
  var map = new BMap.Map("allmap"); // 创建Map实例
  var local = new BMap.LocalSearch(map, {      
    renderOptions:{map: map}      
  });      
  local.search(this.state.inputValue);  
}

onKeyup(e) {
  if(e.keyCode === 13) {
      this.handleBtnClick()
  }
}

}

export default App;
