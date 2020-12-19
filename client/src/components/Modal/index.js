import React, { useEffect, useState } from 'react';
import Boong from '../FoodIcons/Boong';
import Ho from '../FoodIcons/Ho';
import Ta from '../FoodIcons/Ta';
import { TimePicker } from 'antd';
const { RangePicker } = TimePicker;

const { kakao } = window;

import './styles.scss';

const ModalPage = ({ setOpenModal }) => {
  const [food, setFood] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState();
  const [time, setTime] = useState(['00:00', '00:00']);

  const handleOk = (e) => {
    e.preventDefault();
    console.log('handleOk여기실행됏니');
    setOpenModal(false);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    console.log('handleCancel여기실행됏니');
    setOpenModal(false);
  };

  const findAddress = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude; // 위도
        const lon = position.coords.longitude; // 경도
        const geocoder = new kakao.maps.services.Geocoder();

        const coord = new kakao.maps.LatLng(lat, lon);
        const callback = function (result, status) {
          if (status === kakao.maps.services.Status.OK) {
            setLocation(result[0].address.address_name);
          }
        };

        geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
      });
    } else {
      alert('geolocation을 사용할수 없어요..');
    }
  };

  const selectFood = (e) => {
    e.preventDefault();
    setFood(e.target.classList[0]);
  };

  return (
    <div className={'modal-container'}>
      <form className="modal-form">
        <ul className="kind-box">
          <li
            onClick={selectFood}
            className={food === 'boong' ? 'clicked' : ''}
          >
            <Boong />
          </li>
          <li onClick={selectFood} className={food === 'ho' ? 'clicked' : ''}>
            <Ho />
          </li>
          <li onClick={selectFood} className={food === 'ta' ? 'clicked' : ''}>
            <Ta />
          </li>
        </ul>
        <div className="input-box">
          <div className="input-box_title">
            <label htmlFor="name">가게명</label>
            <input
              onChange={(e) => setName(e.currentTarget.value)}
              value={name}
              id="name"
              required
              name="name"
            />
          </div>
          <div className="input-box_location">
            <label htmlFor="location">가게위치</label>
            <input id="location" required name="location" value={location} />
            <button className="location-btn" onClick={findAddress}>
              위치찾기
            </button>
          </div>
          <div className="input-box_time">
            <label htmlFor="time">영업시간</label>
            <RangePicker format="HH:mm" bordered={false} className="time" />
          </div>
        </div>
        <div className="button-box">
          <button onClick={handleCancel}>뒤로가기</button>
          <button onClick={handleOk}>등록하기</button>
        </div>
      </form>
    </div>
  );
};

export default ModalPage;
