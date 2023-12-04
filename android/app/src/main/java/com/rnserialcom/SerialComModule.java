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
        if (serialPortManager == null) {

            final Device device = new Device();
            device.path = selectPort;
            device.speed = selectSpeed;
            serialPortManager = new SerialPortManager(device);

            device.path = selectPort;
            device.speed = selectSpeed;
            serialPortManager.setOnDataReceiveListener(new SerialPortManager.OnDataReceiveListener() {
                @Override
                public void onDataReceive(byte[] recvBytes, int i) {

                    if (i == 32) {
                        WritableMap params = Arguments.createMap();
                        String textValue = convertData(recvBytes);
                        params.putString("data", textValue); // Thêm dữ liệu cần truyền
                        sendEvent("onDataReceive", params);
                    }
                }
            });
        } //

    }
    
    String convertData(byte[] data) {
        if (data != null && data.length > 0) {
            String textValue = new String(data, StandardCharsets.US_ASCII);
            textValue = textValue.replace("\r", "").replace("\n", "");

            if (!(textValue.indexOf("ST,GS") > 0)) {
                return "";
            }
            textValue = textValue.replace("ST,GS,", "").replace("ST,GS", "").trim();
            return textValue;
        }
        return "";
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
    public void testSendEvent(String textValue){
        WritableMap params = Arguments.createMap();
        textValue = textValue.replace("\r", "").replace("\n", "");

        if (!(textValue.indexOf("ST,GS") > 0)) {
            textValue = "";
        }
        textValue = textValue.replace("ST,GS,", "").replace("ST,GS", "").trim();
        params.putString("data", textValue);

        sendEvent("onDataReceive", params);

    }
    
    @ReactMethod
    public void addListener(String eventName) {
          WritableMap params = Arguments.createMap();
        params.putString("data", "abc");
         sendEvent("onDataReceive", params);
        // if (serialPortManager == null) {
        //     System.out.println( eventName + "ABC");
        //      final Device device = new Device();
        //     device.path = selectPort;
        //     device.speed = selectSpeed;
        //     serialPortManager = new SerialPortManager(device);

        //     device.path = selectPort;
        //     device.speed = selectSpeed;
        //     serialPortManager.setOnDataReceiveListener(new SerialPortManager.OnDataReceiveListener() {
        //         @Override
        //         public void onDataReceive(byte[] recvBytes, int i) {
        //             System.out.println( recvBytes.toString() + "REC");
        //             if (i == 32) {
        //                 WritableMap params = Arguments.createMap();
        //                 String textValue = new String(recvBytes, StandardCharsets.US_ASCII);
        //                 params.putString("data", textValue);  // Thêm dữ liệu cần truyền
        //                 sendEvent("onDataReceive", params);
        //             }
        //         }
        //     });
        //}//
    }
}
