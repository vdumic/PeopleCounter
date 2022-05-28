#ifndef HttpClient_h
#define HttpClient_h

#include <WiFi.h>
#include <HTTPClient.h>

void http_client_init();

void http_client_send_data(int peopleInside, int peopleOutside);

#endif