/**
 * Copyright 2014 Facebook, Inc.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to
 * use, copy, modify, and distribute this software in source code or binary
 * form for use in connection with the web services and APIs provided by
 * Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use
 * of this software is subject to the Facebook Developer Principles and
 * Policies [http://developers.facebook.com/policy/]. This copyright notice
 * shall be included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE
 *
 * @flow
 */
'use strict';

var Animated = require('Animated');
var Dimensions = require('Dimensions');
var F8Button = require('F8Button');
var F8Colors = require('F8Colors');
var Image = require('Image');
var React = require('React');
var StatusBarIOS = require('StatusBarIOS');
var StyleSheet = require('StyleSheet');
var View = require('View');
var { Text } = require('F8Text');
var LoginButton = require('../common/LoginButton');
var TouchableOpacity = require('TouchableOpacity');

var { skipLogin } = require('../actions');
var { connect } = require('react-redux');

function Section({anim, shift, children}) {
  return (
    <Animated.View style={[styes.section]}>
      {children}
    </Animated.View>
  );
}

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anim: new Animated.Value(0.0),
    };
  }

  componentDidMount() {
    StatusBarIOS && StatusBarIOS.setStyle('default');
    Animated.timing(this.state.anim, {toValue: 1.0, duration: 2000}).start();
  }

  render() {
    return (
      <Image
        style={styles.container}
        source={require('./img/login-background.png')}>
        <TouchableOpacity
          style={styles.skip}
          onPress={() => this.props.dispatch(skipLogin())}>
          <Animated.Image
            style={this.fadeIn(0.8)}
            source={require('./img/x.png')}
          />
        </TouchableOpacity>
        <View style={styles.section}>
          <Animated.Image
            style={this.fadeIn(0)}
            source={require('./img/devconf-logo.png')}
          />
        </View>
        <View style={styles.section}>
          <Animated.Text style={[styles.h1, this.fadeIn(0.2, -10)]}>
            code to
          </Animated.Text>
          <Animated.Text style={[styles.h1, {marginTop: -30}, this.fadeIn(0.2, 10)]}>
            connect
          </Animated.Text>
          <Animated.Text style={[styles.h2, this.fadeIn(0.3, 10)]}>
            April 12 + 13 / Fort Mason Center
          </Animated.Text>
          <Animated.Text style={[styles.h3, this.fadeIn(0.35, 10)]}>
            SAN FRANCISCO, CALIFORNIA
          </Animated.Text>
        </View>
        <Animated.View style={[styles.section, styles.last, this.fadeIn(0.6, 20)]}>
          <Text style={styles.loginComment}>
            Use Facebook to find your friends at F8.
          </Text>
          <LoginButton />
        </Animated.View>
      </Image>
    );
  }

  fadeIn(delay, from = 0) {
    const {anim} = this.state;
    return {
      opacity: anim.interpolate({
        inputRange: [delay, delay + 0.3],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      }),
      transform: [{
        translateY: anim.interpolate({
          inputRange: [delay, delay + 0.3],
          outputRange: [from, 0],
          extrapolate: 'clamp',
        }),
      }],
    }
  }
}

const scale = Dimensions.get('window').width / 375;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 26,
    // Image's source contains explicit size, but we want
    // it to prefer flex: 1
    width: undefined,
    height: undefined,
  },
  section: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  last: {
    justifyContent: 'flex-end',
  },
  h1: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: Math.round(74 * scale),
    color: F8Colors.darkText,
    backgroundColor: 'transparent',
  },
  h2: {
    textAlign: 'center',
    fontSize: 17,
    color: F8Colors.darkText,
    marginVertical: 20,
  },
  h3: {
    fontSize: 12,
    textAlign: 'center',
    color: F8Colors.lightText,
    letterSpacing: 1,
  },
  loginComment: {
    marginBottom: 14,
    fontSize: 12,
    color: F8Colors.darkText,
    textAlign: 'center',
  },
  skip: {
    position: 'absolute',
    right: 0,
    top: 20,
    padding: 15,
  },
});

module.exports = connect()(LoginScreen);
