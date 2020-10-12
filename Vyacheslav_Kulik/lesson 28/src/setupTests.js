import { configure, shallow, mount, render } from 'enzyme';
React.useLayoutEffect = React.useEffect
import Adapter from 'enzyme-adapter-react-16';
import React from "react";

global.shallow = shallow
global.mount = mount
global.render = render

configure({ adapter: new Adapter() });