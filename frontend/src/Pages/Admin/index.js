
import React from 'react'
import {Tabs } from 'antd';
import MoviesList from './MoviesList.js'
import TheatresList from './TheatresList.js';

function index() {
  return (
    <div>
    <h1 className="text-xl uppercase">
        Admin
    </h1>

      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Movies" key="1">
          <MoviesList />
          
        </Tabs.TabPane>

        <Tabs.TabPane tab="Theatres" key="2">
            <TheatresList/>
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}

export default index