package com.rnserialcom;


import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import android_serialport_api.Device;
import android_serialport_api.SerialPortManager;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;

import java.nio.charset.StandardCharsets;

public class SerialComModule  extends ReactContextBaseJavaModule {
    private String LOG_TAG = "SerialCom";
    public SerialPortManager serialPortManager;
    private String selectPort = "/dev/ttyS4";// RockchipMC y10g20 (tray) // rs485: post "/dev/ttyS3"
    private int selectSpeed = 9600;
    private Context mContext;

    SerialComModule(ReactApplicationContext context) {
        super(context);
        this.mContext = context;
    }

    @Override
    public String getName() {
        return "SerialComModule";
    }
    private void sendEvent(String eventName,
                           @Nullable WritableMap params) {
        getReactApplicationContext()
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }
    @ReactMethod
    public void testSendEvent(){
        WritableMap params = Arguments.createMap();
        params.putString("data", "test");

        sendEvent("onDataReceive", params);

    }
    @ReactMethod
    public void addListener(String eventName) {
        if (serialPortManager == null) {
            final Device device = new Device();
            device.path = selectPort;
            device.speed = selectSpeed;
            serialPortManager.setOnDataReceiveListener(new SerialPortManager.OnDataReceiveListener() {
                @Override
                public void onDataReceive(byte[] recvBytes, int i) {

                    if (i == 32) {
                        WritableMap params = Arguments.createMap();
                        String textValue = new String(recvBytes, StandardCharsets.US_ASCII);
                        params.putString("data", textValue);  // Thêm dữ liệu cần truyền
                        sendEvent("onDataReceive", params);
                    }
                }
            });
        }
    }
}
