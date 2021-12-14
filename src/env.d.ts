declare namespace NodeJS {
  interface ProcessEnv {
    MONGO_URI: string;
    MQTT_URI: string;
    MQTT_USERNAME: string;
    MQTT_PASSWORD: string;
    MQTT_PORT: string;
    MQTT_RECONNECT_PERIOD: string;
  }
}