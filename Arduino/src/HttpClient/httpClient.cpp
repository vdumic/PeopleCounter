#include "httpClient.h"

const char* ssid = "AndroidAP";
const char* password = "12345678";

// Domain Name with full URL Path for HTTP POST Request
const char* serverName = "http://127.0.0.1/people";

void http_client_init() {
  WiFi.begin(ssid, password);
  Serial.println("Connecting");
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());
}

void http_client_send_data(int peopleInside, int peopleOutside) {
  if(WiFi.status()== WL_CONNECTED){
    WiFiClient client;
    HTTPClient http;
    
    // Your Domain name with URL path or IP address with path
    http.begin(client, serverName);
      
    // Specify content-type header
    http.addHeader("Content-Type", "application/json");
    // Data to send with HTTP POST
    String httpRequestData = "{\"peopleInside\":\"" + String(peopleInside) + "\",\"peopleOutside\":\"" + String(peopleOutside) + "\"}";           
    // Send HTTP POST request
    int httpResponseCode = http.POST(httpRequestData);
     
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
        
    // Free resources
    http.end();
  }
  else {
    Serial.println("WiFi Disconnected");
  }
}