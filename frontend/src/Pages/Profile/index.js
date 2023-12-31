import React from 'react'
import {Tabs } from 'antd';
import TheaterList from './TheaterList';
import Bookings from './Bookings';

function index() {
  return (
    <div>
      <h1  className="text-xl uppercase">Profile</h1>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Bookings" key="1">
          <Bookings/>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Apply for Theatre" key="2">
          <TheaterList />
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}

export default index