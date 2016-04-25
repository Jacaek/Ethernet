This design uses Beaglebone Black running Linux Angstrom distribution (Embedded Linux kernel). 
Beaglebone Black is a development platform for ARM Cortex processor (1GHz AM3359 Sitara).
The temperature/humidity sensor is interfaced to Beaglebone Black. I2C protocol is used for communication.
Beaglebone black is running a web server on the local area network. Users (clients) request sensor data
by entering Beaglebone Black's IP address and PORT number in the web page address field.
Example : 10.0.1.8:8080

See Web.png for an image of a completed project.

The software is written in Node.js