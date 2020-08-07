// https://newsapi.org/v2/top-headlines?country=in&apiKey=d1a2290192fa42ed85d67ee17caffc4f
import React, {Component} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Linking,
  ActivityIndicator,
  ImageBackground,
  Image,
  RefreshControl,
  Switch,
} from 'react-native';
import {Button, Card, Text, Divider} from 'react-native-elements';
import {material} from 'react-native-typography';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
export default class NewsCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardloading: true,
      news: [],
      isLocal: true,
    };
  }

  componentDidMount = () => {
    this.makeRequest();
  };

  makeRequest = () => {
    this.setState(this.setState({cardloading: true, news: []}), async () => {
      let res = await fetch(
        'http://newsapi.org/v2/top-headlines?' +
          'country=in&' +
          'apiKey=d1a2290192fa42ed85d67ee17caffc4f',
      );
      let data = await res.json();
      let newdata = data.articles;
      // let newdata = data.articles.slice(0, 5);
      this.setState({news: newdata, cardloading: false});
    });
    console.log('makerwquest');
  };
  makeRequestGlobalNews = () => {
    this.setState(this.setState({cardloading: true, news: []}), async () => {
      let res = await fetch(
        'http://newsapi.org/v2/everything?' +
          'q=coronavirus&' +
          'from=2020-08-07&' +
          'sortBy=popularity&' +
          'apiKey=d1a2290192fa42ed85d67ee17caffc4f',
      );
      let data = await res.json();
      let newdata = data.articles;
      // let newdata = data.articles.slice(0, 5);
      this.setState({news: newdata, cardloading: false});
    });
    console.log('makerwquesGlobalt');
  };
  switchHandler = () => {
    if (this.state.isLocal) {
      this.setState(this.setState({isLocal: false}), () =>
        this.makeRequestGlobalNews(),
      );
    } else if (this.state.isLocal == false) {
      this.setState(this.setState({isLocal: true}), () => this.makeRequest());
    }
    console.log(this.state.isLocal);
  };
  render() {
    return (
      <>
        <View
          style={{
            backgroundColor: '#fff',
            padding: 5,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}>
          <Text style={material.body2}>GLOBAL</Text>
          <Switch
            style={{marginHorizontal: 5}}
            trackColor={{false: '#708090', true: '#81b0ff'}}
            thumbColor={this.state.isLocal ? '#191970' : '#2F4F4F'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => this.switchHandler()}
            value={this.state.isLocal}
          />
          <Text style={material.body2}>LOCAL</Text>
        </View>
        <ScrollView
          style={{marginHorizontal: 10, marginVertical: 10}}
          refreshControl={
            <RefreshControl
              refreshing={this.state.cardloading}
              onRefresh={() =>
                this.state.isLocal
                  ? this.makeRequest()
                  : this.makeRequestGlobalNews()
              }
            />
          }>
          {this.state.news.map((item) => {
            return (
              <View key={item.publishedAt} style={{padding: 10}}>
                <Card
                  containerStyle={{
                    backgroundColor: '#DCDCDC',
                    borderWidth: 0,

                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    margin: 0,
                    padding: 0,
                  }}>
                  <ImageBackground
                    style={{
                      top: 0,

                      left: 0,
                      height: 150,
                      width: '100%',
                    }}
                    source={{uri: `${item.urlToImage}`}}
                  />
                  <View style={{padding: 10}}>
                    <Text style={material.caption}>{item.publishedAt}</Text>
                    <Text style={material.headline}>
                      {item.title.substring(0, 50)}
                    </Text>
                    <Divider style={{marginVertical: 5}} />

                    <Text style={material.body1}>{item.content}</Text>
                    <Button
                      onPress={() =>
                        this.props.navigation.push('article', {url: item.url})
                      }
                      buttonStyle={{
                        width: 100,
                        marginTop: 10,
                        // padding: 5,
                        // borderRadius: 0,
                        // marginLeft: 0,
                        // marginRight: 0,
                        // marginBottom: 0,
                      }}
                      title="VIEW NOW"
                    />
                  </View>
                </Card>
              </View>
            );
          })}
        </ScrollView>
      </>
    );
  }
}