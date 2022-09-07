import { createContext, useEffect, useLayoutEffect, useState } from 'react';
import type { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import {settingsConfig} from "../config";
// import {settingApi} from "../apis/setting-api";
// import {useAuth} from "../hooks/use-auth";
import { Property } from "csstype";

interface Settings { // 색상등등 추가 할 부분
  // 일반
  direction?: 'ltr' | 'rtl';
  responsiveFontSizes?: boolean;
  theme: 'light';
  layout: number;
  favDevices: any[];
  // 컬러 테마
  barColor: string;
  selectedColor: string;
  pageBackgroundColor: string;
  summaryBackgroundColor: string;
  // 로고
  logoSize: 'small' | 'medium' | 'large';
  logoFile: string, // 로고 파일
  // 사이드바
  // 사이드바 리스트
  sideBarGapSize: 'small' | 'medium' | 'large', // small, medium, large
  // 리스트 아이콘
  expanderIcon: string,
  expandIcon: string,
  mainGovernmentOfficeIcon: string, // 본청
  localGovernmentOfficeIcon: string, // 지방청
  policeBoxIcon:string, // 지구대
  deviceDisableIcon: string, // 디바이스 disable Icon
  deviceEnableIcon: string, // 디바이스 enable Icon
  deviceReadyIcon: string, // 디바이스 Ready Icon
  // 색상
  groupTextColor: string, // 계층 색상
  deviceEnableTextColor: string, // 카메라 송신
  deviceReadyTextColor: string, // 카메라 대기
  deviceDisableTextColor: string,  // 카메라 연결불가
  codeZeroColor: string, // 상황 C0
  codeOneColor: string, // 상황 C1
  // 조직 상황
  deviceInfoBgColor: string, // 조직상황 배경
  deviceInfoFormat: string, // 조직상황 표시
  // 배터리 아이콘
  batteryChargeLowIcon: string, // 충전중 low
  batteryChargeMiddleIcon: string, // 충전중 middle
  batteryChargeHighIcon: string, // 충전중 high
  batteryDischargeVeryLowIcon: string, // 방전중 very low
  batteryDischargeLowIcon: string, // 방전중 low
  batteryDischargeMiddleIcon: string, // 방전중 middle
  batteryDischargeHighIcon: string, // 방전중 high
  // 온도 아이콘
  temperatureDangerousIcon: string, // 온도 위험
  temperatureWarningIcon: string, // 온도 경고
  temperatureBewareIcon: string, // 온도 주의
  // 그리드
  // 사이드 요약 정보
  summaryInformation: boolean, // 요약정보 표시여부
  // 영상 그리드
  gridBgImg: string, // 그리드 백그라운드 이미지
  gridBgColor: string, // 그리드 백그라운드 컬러
  // 영상 OSD 설정
  osdBgColor: string, // 배경색
  osdTextColor: string, // 글씨색
  osdInfoFormat: string, // 표시 포멧
  osdDeviceInfoFormat: string, // 카메라 이름 표시 포멧
  // 지도 마커
  mapMarkerCZeroIcon: string,
  mapMarkerCZeroGoodIcon: string,
  mapMarkerCZeroBadIcon: string,
  mapMarkerCOneIcon: string,
  mapMarkerCOneGoodIcon: string,
  mapMarkerCOneBadIcon: string,
  mapMarkerNormalIcon: string,
  mapMarkerNormalGoodIcon: string,
  mapMarkerNormalBadIcon: string,
  mapMarkerPopupIcon: string,
  mapMarkerPopupGoodIcon: string,
  mapMarkerPopupBadIcon: string,
  mapMarkerDisconnectIcon: string,
  mapMarkerSize: 'small' | 'medium' | 'large',
  mapMarkerOffsetY: number,
  gridPaddingTop: string,
  gridPaddingBottom: string,
  mapPopupVideoWidth: string,
  mapPopupVideoHeight: string,
  mapPopupVideoInfoFormat: string,
  mapPopupVideoInfoColor: string,
  mapPopupVideoInfoBgColor: string,
  logoLeftPadding: string,
  headerText: string,
  headerColor: string,
  headerIconColor: string,
  logoImgVisibility: boolean,
  playerTrafficVisibility: boolean,
  playerVehicleVisibility: boolean,
  playerSourceInfoVisibility: boolean,
  gridHeaderVisibility: boolean,
  videoObjectFit?: Property.ObjectFit | undefined;
}

export interface SettingsContextValue {
  settings: Settings;
  saveSettings: (update: Settings) => void;
}

interface SettingsProviderProps {
  children?: ReactNode;
}

const initialSettings: any = { // 초기 값
  logoFile: '', // 로고 파일 base64
  expanderIcon: '',
  expandIcon: '',
  mainGovernmentOfficeIcon: '', // 본청
  localGovernmentOfficeIcon: '', // 지방청
  policeBoxIcon:'', // 지구대
  deviceDisableIcon: '', // 디바이스 disable Icon
  deviceEnableIcon: '', // 디바이스 enable Icon
  deviceReadyIcon: '', // 디바이스 Ready Icon
  groupTextColor: '', // 계층 색상
  batteryChargeLowIcon: '', // 충전중 low
  batteryChargeMiddleIcon: '', // 충전중 middle
  batteryChargeHighIcon: '', // 충전중 high
  batteryDischargeVeryLowIcon: '', // 방전중 very low
  batteryDischargeLowIcon: '', // 방전중 low
  batteryDischargeMiddleIcon: '', // 방전중 middle
  batteryDischargeHighIcon: '', // 방전중 high
  temperatureDangerousIcon: '', // 온도 위험
  temperatureWarningIcon: '', // 온도 경고
  temperatureBewareIcon: '', // 온도 주의
  // 지도 마커
  mapMarkerCZeroIcon: '',
  mapMarkerCZeroGoodIcon: '',
  mapMarkerCZeroBadIcon: '',
  mapMarkerCOneIcon: '',
  mapMarkerCOneGoodIcon: '',
  mapMarkerCOneBadIcon: '',
  mapMarkerNormalIcon: '',
  mapMarkerNormalGoodIcon: '',
  mapMarkerNormalBadIcon: '',
  mapMarkerPopupIcon: '',
  mapMarkerPopupGoodIcon: '',
  mapMarkerPopupBadIcon: '',
  mapMarkerDisconnectIcon: '',
  videoObjectFit: 'contain',
};

export const restoreSettings = (): Settings | null => {
  let settings = null;

  try {
    const storedData: string | null = window.localStorage.getItem('settings');
    if (storedData) {
      settings = JSON.parse(storedData);
    } else {
      settings = initialSettings;
    }
  } catch (err) {
    console.error(err);
    // If stored data is not a strigified JSON this will fail,
    // that's why we catch the error
  }

  return settings;
};

//update api
const updateSettings = async (id: any, settings: Settings) => {
  try{
    console.log('updateConfigApi');
    // await settingApi.saveUserConfig([id], settings)
  }catch (e) {
    console.log("[postSettingsErr]: ",e);
  }
}

export const storeSettings = (settings: Settings): void => {
  window.localStorage.setItem('settings', JSON.stringify(settings));
};

export const SettingsContext = createContext<SettingsContextValue>({
  settings: initialSettings,
  saveSettings: () => { }
});

export const SettingsProvider: FC<SettingsProviderProps> = (props) => {
  const { children } = props;
  const [settings, setSettings] = useState<Settings>(initialSettings);
  // const {isAuthenticated, users} =useAuth();
  // get api
  const getConfig = async () => {
    try{
      console.log('getConfigApi');
      // const { data } = await settingApi.getUserConfig(users.[id]);
      // setSettings((prev) =>({...prev, ...data}));
    }catch (e){
      console.log('[getSystemConfigErr]: ', e)
    }
  }

  // useLayoutEffect( () => {
  //   if( !isAuthenticated ) return;
  //   getConfig();
  // }, [isAuthenticated])

  useEffect(() => {
    // console.log(settings);
  }, [settings]);


  // useEffect(() => {
  //   const restoredSettings = restoreSettings();
  //
  //   if (restoredSettings) {
  //     setSettings(restoredSettings);
  //   }
  // }, []);

  const saveSettings = (updatedSettings: Settings): void => {
    setSettings(updatedSettings);
    // storeSettings(updatedSettings);
    //update api
    // updateSettings(users.[id], updatedSettings);
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        saveSettings
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

SettingsProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const SettingsConsumer = SettingsContext.Consumer;
