---
title: "Design and Development of a Low-power Low-Cost heart rate monitor"
author_profile: false 
date: 2024-09-28
layout: single
categories: projects
tags: [IoT, firmware, hardware]
header:
  image: "/assets/images/project1/main.jpg"
  overlay_image: /assets/images/project1/main.jpg
  overlay_filter: rgba(0, 0, 0, 0.5)
  overlay_height: "50vh"
  caption: ""
toc: true  # Enable Table of Contents
toc_label: "Contents"  # Customize TOC title
toc_icon: "list"  # Add an icon to the TOC
toc_sticky: true  # Makes the TOC sticky while scrolling
---


## Project overview

This project focuses on the successful end to end development of a compact, low-cost, low-power wearable device designed to monitor heart rate. Initially conceived as an independent project by a team of two engineering students, it eventually evolved into our bachelor's project due to its promising potential and scope. The device combines innovative hardware, firmware and software solutions to track physiological signals, integrating seamlessly with a custom mobile application for user interaction.

The core of this project lies in leveraging Photoplethysmography (PPG) for heart rate detection—an affordable and non-invasive optical technique that uses light to measure blood volume changes in the microvascular bed. The collected data undergoes a series of signal conditioning processes and is managed by a microcontrollers, ensuring precise detection and energy-efficient operation.

Key features include wireless data transmission to a smartphone app via Bluetooth Low Energy (BLE), providing real-time monitoring and user-friendly interaction. The ultimate goal is to analyze sleep phases accurately, allowing the device to determine the optimal wake-up time to reduce abrupt awakenings and promote better rest.

Throughout this post, you’ll find a detailed breakdown of the design decisions, component choices, and testing processes that were essential in creating this wearable. From the power-efficient operational amplifiers to the custom mobile application, each element was selected and integrated with careful attention to performance, cost, and user experience.

## Hardware

![Hardware Image](/assets/images/project1/hardware.jpg)

### PCB Overview

This section delves into the critical aspects of component selection for the project. the aim is to provide a comprehensive overview, detailing the rationale behind choosing specific components, their specifications, functionalities, and performance characteristics. Additionally, I discuss the trade-offs and compromises made during the selection process.
#### Front and Back PCB View

<div style="display: flex; justify-content: space-around; align-items: center;">
  <img src="/assets/images/project1/front_full.png" alt="PCB Front" style="max-width: 45%;">
  <img src="/assets/images/project1/back_full.png" alt="PCB Back" style="max-width: 45%;">
</div>


The two circuits on the figure above depicts both sides of the complete circuit bord.


#### Criteria for Selection
In developing the heart rate monitor, we focused on four key aspects: affordability, power efficiency, size, and functionality.

**Affordability:**
The aim was to keep costs low. The goal was to find components that
were both economical and reliable, ensuring good performance without a high price tag. Which included searching through various components and picking components that only served the function without the extra overhead and cost.


**Compact Size:**
Since the device is wearable, it was important to choose small-
sized components and packages. This helps keep the device comfortable and practical for everyday use.




**Efficient Functionality and Power Use:**
Additional priority was to select components that were not only effective in their role but also energy-efficient. Efficient power use is vital for the device as it extends battery life, making it more suitable for long-term, continuous heart rate monitoring. These Four factors – cost, size, efficiency, and functionality – were crucial in guiding
the design choices for the heart rate monitor, ensuring it meets both technical goals and user needs.


#### Key Components Specifications, Features, and Trade-offs

**MCP6004 Operational Amplifiers**
The MCP6004 operational amplifiers (op-amps) are key for amplifying and filtering the heart rate signals from the photodiode. This ensures accurate heart rate measurement by effectively amplifying the weak signals without introducing significant noise. These op-amps also have low power consumption, aligning well with the device's efficiency needs.

**STM8S003F3 Microcontroller**
The STM8S003F3 is the central control unit of the heart rate monitor. It's selected for its efficient balance of power, cost, and capabilities. It has enough processing power for the heart rate data collection task while keeping power usage and costs to a minimal, which extends battery life and supports budget optimization.

**ESP32-C3 Mini (Bluetooth Module)**
The ESP32-C3 Mini serves as the communication hub, enabling Bluetooth Low Energy connectivity. It includes various power modes that help optimize battery life, while also supporting versatile communication options. This module was chosen due to its cost-effectiveness and integrated features.

**LIS2DH12TR Accelerometer**
The LIS2DH12 accelerometer is used to collect movement data for enhancing the accuracy of sleep cyckle analysis. It operates on ultra-low power, ideal for the battery-powered wearable.

**SFH 2430 Photodiode**
The SFH 2430 photodiode is used for its spectral sensitivity, especially in the green light range. This allows it to detect subtle changes in blood volume efficiently, which is essential for accurate heart rate measurement in the photoplethysmography (PPG) setup.

**Low Dropout (LDO) Regulator**
The TCR2EF33 LDO regulator ensures stable power for the system, providing a consistent 3.3V from a LiPo battery. Its small size and low noise make it suitable for maintaining reliable performance in the device. Although a switch mode regulator would be more ideal for greater efficiency, it was not integrated due to time constraints.

**Battery Management System (BMS)**
The MCP73831/2 BMS handles battery charging efficiently, featuring thermal regulation and high accuracy for consistent charging.




### Bill of Materials (BOM)

The table demonstrates Bill of Material in producing one wristband and their bulk pricing discounts. As the quantity purchased increases from 1 to 100 and then to 1000, the price per unit decreases for most parts. The Bill of Materials provides an overview of all components used in the design. ( Price in danish crowns )

![BOM List](/assets/images/project1/BOM_list.png)


### PPG Circuit Design

![PPG Circuit](/assets/images/project1/PPG circuit.png)

The PPG circuit consists of multiple stages to amplify and filter the signal generated by the photodiode, which detects variations in light intensity due to blood flow.

The first stage is an operational amplifier (op-amp) configured with a photodiode to generate an analog signal proportional to light intensity. The op-amp’s configuration ensures that the signal corresponds to changes in blood volume during each cardiac cycle. A high-pass filter follows, with a cutoff frequency of 0.48 Hz, designed to remove the DC component and low-frequency noise, preserving the AC component which represents the pulsatile blood flow. This ensures the signal is ready for subsequent stages.

Next is the Unity Gain Buffer, which isolates the high-pass filter from the following stages, ensuring signal stability by preventing interactions between them. This stabilization is necessary to maintain the integrity of the signal through the amplification process.

The signal then passes through an Active Low-Pass Filter, which has a cutoff frequency of 33.86 Hz and a gain of 10. This stage is responsible for removing high-frequency noise that may arise from external sources such as electronic devices or motion artifacts. The LPF ensures that the signal’s frequency range matches that of physiological interest in PPG analysis.

The final amplification stage is an inverting amplifier with a gain of 22, which brings the signal back in phase and amplifies it for further processing. This conditioned signal is then suitable for digitization by an analog-to-digital converter (ADC) for heart rate monitoring



### Complete Circuit Layout

![KiCad PCB Layout](/assets/images/project1/Circuit_kicat-1.png)

The complete circuit diagram represents the whole integrated system for the PPG-based heart rate monitoring device. It includes multiple functional blocks: the PPG signal processing circuit with photodiode and op-amps, the STM8S microcontroller for managing data acquisition and system control, the ESP32 for BLE communication, battery management components, power regulation circuits, and USB-C for programming, interfacing and Charging

### PCB Wiring and Layout

![KiCad PCB Layout](/assets/images/project1/Kicad_PCB.png)

This PCB layout shows the complete design of the PPG-based heart rate monitoring system. It includes multiple subsystems: the analog front-end for signal conditioning, the STM8S microcontroller, the ESP32 module for BLE communication, and power management components. The layout is compact, featuring well-routed traces for both power and signals to minimize interference. Key elements such as connectors for programming and charging, along with well-isolated analog and digital sections for optimal signal quality.

## Overview of Firmware

The firmware is the brain behind the wearable device, responsible for orchestrating precise control, efficient data acquisition, and seamless communication. Designed with power efficiency as a top priority, the firmware manages tasks across the STM8S microcontroller and the ESP32 module, ensuring smooth data flow from heart rate detection to mobile app.

By leveraging features scuh as low-power sleep modes, UART communication, and Bluetooth Low Energy (BLE) synchronization, the firmware maximizes battery life while maintaining accurate and timely processing. In this chapter, we explore how these functionalities come together to enable robust and continuous monitoring.

### Ultra Low Power Main-Processor(STM8S)

In this section, we delve deeper into the functioning role of the STM8S microcontroller within the system. The STM8S microcontroller plays a crucial role in fulfilling key responsibilities such as data acquisition, memory management, and overall system timing. Given its notable characteristic of being a ultra low-power microcontroller, it is also entrusted with managing the circuit’s power consumption. This includes controlling the Low Dropout Regulator (LDO) to power down other components when necessary, while controlling the wake-up sequence for the ESP32.


**The STM8S Roles** <br>
The STM8S plays important roles in the design. It initiates its function by acquiring and storing the PPG signal, sourced from the op-amp circuit. While the ADC is inherently a 10-bit system, the op-amp circuit is designed to produce a signal within the range of 0, 5 − 1, 5V<sub>PP</sub> relative to the supplied 3.3V Voltage. This deliberate design choice enables the removal of the two highest bits without compromising signal integrity. Operating at 8 bits per sample, as opposed to the original 10 bits, allows the STM8S to transmit a higher bit density with each UART package.

The timing of the sampling process is critical for the overall system, particularly for the precision of the Fast Fourier Transform (FFT) at a later stage. Sampling is accomplished through interrupts occurring at a frequency of every 20ms. Achieving this timing involves implementing a prescaler to divide the core frequency of 8M Hz down to 50Hz, well above the Nyquist interval for the PPG signal. Lowering the sampling rate to 50Hz substantially reduces power consumption compared to the standard 2M Hz sampling rate. This specific sampling frequency strategically uti-
lizes aliasing to filter out any 50Hz noise.

Considering the 20ms interval for ADC sampling, a buffer of 125 bytes, equivalent to 125 samples corresponding to 2.5 seconds of data, is chosen to store the data. the stm8 follows the flow shown on the figure below


<div style="display: flex; align-items: flex-start;">
  <div style="flex: 2; padding-right: 20px;">
    <p>The STM8S plays a crucial role in power management by deciding when to awaken the more power-intensive ESP32 for data transmission.
    The ESP32 is activated only once every 2.5 seconds to receive the
    buffered data via UART. Therefore, the STM8S must be an energy-efficient unit, as it remains active most of the time, overseeing the wake-up sequence for the ESP32, this is done by sending a pulse on a designated IO port acting as an external trigger for the ESP32, just before the 125-byte buffer is filled, to make sure it’s awake before receiving the buffer.</p>
  </div>
  <div style="flex: 1;">
    <figure>
      <img src="/assets/images/project1/STM8_Buffer_Logic.png" alt="STM8 Buffer Logic" style="max-width: 100%; height: auto;">
      <figcaption> STM8 Buffer Logic.</figcaption>
    </figure>
  </div>
</div>



#### UART Protocol

The communication link between the STM8S and ESP32 modules is established
through UART, We chose this protocol because of its viability for point-to-point low-speed serial data transfer that utilizes only two wires. This choice is particularly suitable for the application due to its compatibility with the sample size – UART transfers data in 8-bit packages, hence the downscaling of the 10bit ADC for higher bit density for each package sent.

To facilitate seamless communication, the UART is configured for both receive (RX) and transmit (TX) operations. This enables the transfer of data and also the implementation of handshakes (relaying information) between the microcontrollers. As part of the handshake mechanism, a 126-byte buffer is allocated, with the first byte reserved for ’02,’ representing ”Start of Text” in ASCII. This serves as a signal to the receiving ESP32, indicating the initiation of incoming data.

Additionally, to activate the STM8S and initiate data collection, the ESP32 sends’82’ (representing ”R” in ASCII) via UART. This deliberate sequence acts as a wake-up call, allowing the STM8 to power up and begin gathering data. Notably, this approach contributes to power conservation by facilitating a shutdown mode when the system is not in active use.

#### ESP32-C3 (Bluetooth module)

The ESP32 serves two main functions within the circuit, acting as the conduit between the system and the user’s phone through Bluetooth connectivity. It also serves as a data storage buffer, compensating for the limited memory of the STM8S. Furthermore, the ESP32 plays the role of an intermediary, relaying ”handshake” messages to the Phone APP and also back to the STM8, facilitating error handling and synchronization of communication between the three main processors. This handshake is also used to power up the system

The ESP32 firmware is tailored to manage Bluetooth Low Energy (BLE) commu-
nications efficiently. It initializes and manages a BLE server, setting up advertising data and creating BLE services and characteristics. This setup allows the ESP32 to handle read/write requests from BLE clients and respond to various BLE events, ensuring a stable and responsive connection with the user’s phone.

The firmware also includes custom callbacks and event handlers to manage these BLE events, such as connection, disconnection, and data reception. This management is crucial for maintaining a reliable data flow and ensuring that the system responds appropriately to different communication scenarios.

Additionally, the firmware employs FreeRTOS, an operating system designed for
real-time applications, to handle tasks and events. It creates specific tasks for monitoring buffer status, managing BLE communications, and handling other system events. This multitasking capability allows the ESP32 to efficiently handle multiple operations, such as data buffering and message relaying, without compromising performance

**The ESP32 timing and power management**

Effective Power Management is key in wearable technology. The ESP32 micro-
controller is programmed to enter a low-power deep sleep mode during periods of inactivity. This feature is integral to prolonging the wristband’s battery life, ensuring it remains functional for extended periods.

The ESP32 utilizes Bluetooth 4.0, focusing on the energy-efficient Bluetooth Low Energy (BLE). The BLE module can power down while maintaining a connection, achieved by placing the ESP32 in Deep Sleep mode. In this state, the ESP32 awaits a pulse on the GPIO 0 pin from the STM8S to wake up. During Deep Sleep, only the GPIO 0 pin remains active to facilitate external wakeup.

Upon waking, the ESP32 receives a 125-byte buffer from the STM8S, stored in a
500-byte buffer on the ESP32. After storing the data, the ESP32 returns to Deep Sleep. This cycle repeats until the 500-byte buffer is full. The full buffer is then transmitted via BLE to the phone APP for processing. Post-transfer, the ESP32 re-enters Deep Sleep, marking the start of a new cycle.

he cycle lasts approximately 10 seconds, correlating with the initial 125-byte buffer representing 2.5 seconds of samples. Accumulating these samples in the 500-byte buffer accounts for 10 seconds of sample storage. This cycle ensures efficient data transfer while optimizing power consumption in the Bluetooth unit. The process is depicted in the figure below To prevent the data from being deleted when the device is
set to Deep Sleep, the data buffer is stored in the RTC memory, which is kept on during Deep sleep.



<figure>
  <img src="/assets/images/project1/ESP_buffer_logic.drawio.png" alt="ESP Buffer Flowchart" style="max-width: 100%; height: auto;">
  <figcaption>ESP Buffer Logic</figcaption>
</figure>


### Bluetooth Low Energy Communication
Bluetooth Low Energy (BLE) is a protocol for wireless communication. Unlike
traditional Bluetooth, BLE is designed to use less power, in addition to a deep sleep functionality making it ideal for battery-powered devices.


**Protocol stack**

**Generic Access Profile or GAP** is essentially the framework that allows BLE devices to communicate in standardized ways. It manages how devices 
”advertise” themselves and how they discover and connect with each other. In the wristband, GAP ensures the device can be discovered by a smartphone and allows the two to establish a connection


**GATT or Generic Attribute Profile**. GATT describes how data is structured
and exchanged between BLE devices. it can be thought of as a set of rules for how to package and interpret the data that moves between the server (wristband) and the Client (smartphone). We’ve created a custom service within GATT specifically for transmitting heart rate metrics furthermore a service for transmitting the battery percentage for the device, and later on will apply a service for the accelerometer data. this will allow a phone to distinguish and categorize different data streams’ intended purpose.


**Advertisements and Paring**

**Services**: Modular Functional Containers. In the Bluetooth Low Energy
(BLE) protocol, Services serve as modular containers for grouping functionalities. Each service encapsulates a collection of data and behaviors to a specific feature of a BLE device. For example, ”Heart Rate Service” groups all functionalities and data related to heart rate tracking.

**Characteristics**: Data Points within Services. Characteristics are the discrete data points within a service, each representing a specific attribute or functional aspect. They are the primary elements through which data interaction occurs in BLE. Characteristics within a service could be ”Heart Rate Measurement” or ”Body Sensor Location” the heart rate service can hold individual data values, accompanied by descriptors detailing the data format and properties defining interaction capabilities (read, write, notify).

**Universally Unique Identifiers (UUIDs)** UUIDs are a fundamental aspect of BLE technology, serving as unique identifiers for distinct BLE services and characteristics. They are essential for ensuring that data is correctly recognized and processed by both the transmitting and receiving devices

<figure>
  <img src="/assets/images/project1/ESP_BLE_FLOW.drawio.png" alt="BLE Flowchart" style="max-width: 100%; height: auto;">
  <figcaption>BLE Flow</figcaption>
</figure>


**Custom and Predefined UUIDs**. Standard BLE services and characteristics
often use predefined 16-bit UUIDs, which are shorter and based on a standard issued by the Bluetooth SIG (Special Interest Group). These predefined UUIDs cover common services and characteristics, making them universally recognizable across different BLE devices. However, for unique or custom services and characteristics that are not part of the standard set, 128-bit UUIDs are used. The longer length of 128-bit UUIDs offers an almost limitless pool, ensuring that custom UUIDs are unique across all BLE devices globally.

**Custom 128-bit UUIDs** In the Heart rate tracking wristband
The use of costum 128bit UUID were used to cater to the specific requirements for consumer market readiness. the heart rate monitoring device had to avoid potential overlap with standard BLE services found in our everyday use of IoT but also unique identification of the device to have not only secure and reliable data transmission but also making it unique to the APP. Although there already exists predefined 16-bit in the SIG standard UUIDs for heart rate services, these are typically utilized for transmitting heart rate data that has already undergone processing on the device
prior to transmission. This means the heart rate data is sent in its final, analyzed, BPM form. Which is not viable for the project requirements.



**Advertising Mode**: In Advertising Mode, the wristband broadcasts its presence and readiness to connect. We utilize the ’connectable’ mode, enabling smartphones and other devices to recognize and establish a two-way connection with the wristband. This mode is vital for ensuring the wristband is easily discoverable and connectable

**Scan Mode**: Scan Mode dictates how a central device, like a smartphone, searches for BLE devices. The system employs ’active scanning’ on smartphones, facilitating a quicker and more efficient discovery of the wristband.


<figure>
  <img src="/assets/images/project1/BLE_Connect_dia.png" alt="BLE Flowchart" style="max-width: 100%; height: auto;">
  <figcaption>Connection Process of BLE communcation</figcaption>
</figure>



## Mobile App Integration

The development of an app to interface with the device was essential for several reasons. Firstly, it allowed for the offloading of computationally intensive tasks, such as Fast Fourier Transforms (FFT), to the app. This approach enabled the use of less powerful, yet more energy-efficient and cost-effective microcontrollers. Additionally, the app will later incorporate a machine learning algorithm to identify sleep phases. A user-friendly interface is also a key aspect of the app, serving The
purposes to allow users to set a wake-up alarm and a bonus of visualising the heart rate data. The app also utilizes the smartphone’s audio and vibration capabilities for alarm functionality, enhancing the user experience.

### Mobile APP UI/UX

The application is developed using Flutter, a versatile framework based on Dart, which allows for a single codebase to be effectively compiled for both iOS and Android platforms. Its designed as an alarm clock that allows users to set their desired wake-up time , ensuring the alarm sounds at the specified moment and to function even when the phone is not actively used, as long as the app runs in the background.

Recognizing the diversity in time format preferences, the app adapts its UI for different regions: it uses the 24-hour (military time) format for users in the European Union and other regions where this system is used, and the 12-hour format (AM/PM) for North America and areas where this format is prevalent

<figure>
  <img src="/assets/images/project1/App ui.jpg" alt="ESP Buffer Flowchart" style="max-width: 50%; height: auto;">
  <figcaption></figcaption>
</figure>

Additionally, the app automatically detects the user’s location and adjusts its internal clock to the local timezone, ensuring that the set alarm time aligns with the user’s actual local time

Aesthetically, the app employs a dark, soothing theme to minimize disturbance in low-light environments. The app also includes a snooze botton which will sound the alarm again after 20seconds. Looking ahead, plans are in place to enhance the app with customizable features, including a variety of alarm tones and calming ambient sounds, further enriching the user experience

### App Connectivity

The app is designed to exclusively recognize and pair with the unique UUID of the wristband, enhancing both user convenience and device security. This approach simplifies the connection process for the user, as the app actively isolates and identifies the specific wristband, streamlining the pairing procedure. Additionally, it acts as a security measure, preventing access to the app without possession of the wristband.

In environments where multiple devices are present, such as in households with several users, the app utilizes an intelligent selection mechanism. It only prioritizes and displays the wristband with the highest dBm signal, indicating the strongest radio signal power level. This can accurately measure range from the source in this case the wristband This feature is crucial for avoiding unintended connections to nearby devices. By highlighting the wristband with the strongest dBm signal, the app enhances both user convenience and the reliability of the connection.


### Data acquisition and processing
When the phone is connected to the wristband ie the ESP32c3, which functions as a server, the APP will receive the message ”FULL” from the ESP32. When its buffer is full that will initiate 25 consecutive GATT requests to the server (esp32). In order to receive the 500byte buffer, containing the raw heart rate data. Each BLE transmission is of 20bytes chunks, as that’s what BLE 4.0 is capable of sending.

The APP takes the 500byte buffer, and sends it to the digital signal processing FFT. Since we have a sampling frequency of 50Hz and each sample is 1byte, the 500byte buffer corresponds to 10 seconds, of raw heart rate data. The bin size of 500 and sample rate of 50Hz, corresponds to a frequency resolution of 0.1Hz, which translates to 6bpm, which is not sufficient for accurate heart rate detection. This is a direct consequence of the above-mentioned power-saving strategies.

The frequency resolution of the FFT is given by the formula: <script type="text/javascript" async src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML"></script>


<p>\(\Delta f = \frac{f_s}{N}\)</p>

Where f is the frequency fs is the sample frequency and N is the number of Bins.

Looking at the formula it shows that increasing the bin size would amount to a higher frequency resolution, increasing the bin size on a firmware level would mean even longer than the 10 seconds current delay which would be insufficient for real-time analysis.

Instead, we opt to improve resolution using a circular buffer increasing the FFT Bin size on the APP side where we initially collect 10 seconds of data, process it meaning we process a FFT, we then merge each subsequent 10-second data sets with the previous data set, 5 times and continue to create an FFT over each new merged set and discarding the sixth and oldest data set. This gives a bin size of 2500 after 50 seconds, which is a frequency resolution of 0.02Hz which correlates to 1.2 BPM resolution.

<script type="text/javascript" async src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML"></script>

<p>Mathematical Expression:</p>
<p>\[
N = \frac{50 Hz}{0.02 Hz} = 2500 \, Samples
\]</p>

This method allows to maintain a continuous, evolving signal analysis with improved resolution without the drawbacks of increased power usage or significant delays in heart rate data processing.


To accurately determine the heart rate from the FFT output, the application starts by identifying the frequency with the highest magnitude from each FFT analysis. This frequency is indicative of the heart rate. To convert this frequency into beats per minute (BPM) the formula is given by BPM = fpeak· 60. This calculated BPM is then displayed on the smartphone application, providing a visual representation of the user’s heart rate

## System Integration and Data Flow

the project culminates in a finely tuned, integrated system designed to monitor heart rate with precision and efficiency. The system’s foundation lies in the interplay between the STM8S microcontroller and the ESP32 module, complemented by power and data management strategies. This section will encapsulate the cohesive operation of these components, outlining the system’s functionality holistically.

### Integration Detailing

At the start of operation, the STM8S microcontroller functions as the system’s main roccessor, orchestrating the data acquisition from the (PPG) sensor circuit. With an ADC interrupt occurring every 20ms, the STM8S ensures a continuous flow of data into Buffer 1. The subsequent transfer of data to the ESP32 is timed at precise 2.5-second intervals, providing a balanced trade-off between real-time processing and power conservation.

### Data Flow and Timing Analysis


Referencing the timing diagram provide , the data’s journey from Buffer
1 on the stm8s through Buffer 2 on the esp32 and ultimately to Buffer 3 (FFT) on the APP reflects a carefully choreographed sequence. This sequence aligns with the ESP32’s awakening from its Deepsleep mode every 2.5 seconds to acquire, store and forward the raw heart rate data every 10 seconds to the Phone APP for further processing and visualisation. This systematic approach minimizes energy consumption while maintaining the fidelity of the heart rate signal.



<figure>
  <img src="/assets/images/project1/sequence.drawio.png" alt="BLE Flowchart" style="max-width: 100%; height: auto;">
  <figcaption>Sequence diagram of complete system.</figcaption>
</figure>



## Testing and Validation

The testing strategy for the heart rate monitoring wristband is designed to comprehensively evaluate the system’s performance, reliability, and power efficiency. It encompasses a range of tests targeting different aspects of the system, from individual section to the integrated whole.

<figure>
  <img src="/assets/images/project1/Heart_rate_ozzy.png" alt="BLE Flowchart" style="max-width: 100%; height: auto;">
  <figcaption>Oscilloscope heart rate readings</figcaption>
</figure>


To assess the PPG circuit’s functionality, we utilized an oscilloscope for direct analysis of the output from the final operational amplifier. This examination is crucial to ensure the circuit accurately conditions the signal from the Photodiode. The resulting oscilloscope display showed a waveform characteristic of a PPG signal shown in This waveform’s pattern of peaks and troughs, synchronized with the heartbeat, indicated proper detection of blood volume changes. The amplitude and frequency of the waveform were of particular interest. Consistent amplitude peaks suggested effective amplification without distortion, while the frequency of these peaks matched expected heart rates, confirming the circuit’s
functionality. The minimal noise in the signal also indicated the effectiveness of the filtering design in reducing electronic interference, crucial for capturing a clean PPG signal. In conclusion, the oscilloscope readings, particularly with the sensor activated by finger placement, verified that the PPG circuit is functioning as designed, providing
accurate and reliable data for cardiovascular monitoring.

### Signal Quality Assessment
In assessing the quality of the signal the first objective was to measure the Quality and accuracy of a known signal through the system, to observe for any corruption through each stage of buffers and to ensure the FFT handled the acquired data correctly. Lastly a heart rate signal from the PPG circuit was measured through the system to determine quality and accuracy of the device and its capability to accurately capture and process heart rate.



### End to End testing
To conduct this test showcasing the end to end functionality of the system, a Function generator set at 1.1Hz was connected between the ADC pin of the STM8S and ground. While having the PPG circuit cut off from the ADC.


<figure>
  <img src="/assets/images/project1/sin plot from ADC_ESP_APP.png" alt="BLE Flowchart" style="max-width: 100%; height: auto;">
  <figcaption>Plot of Function generator signal through entire system system.</figcaption>
</figure>

shown on figure above is the known signal, captured though the whole system from the ADC to the app. For this test The app got programmed to store the raw heart rate data in a file before processing the FFT. From this we could reconstruct the signal to visualise and asses both quality and accuracy of the signal Referencing the figure it is evident that the signal is whole and continues which likely would indicate the buffer scheme, timing and logic is functioning correctly, furthermore the observed output of the FFT aligned with the known signal of 1.1Hz. this test was done for a range of frequency’s with a 0.1hz resolution and the results measured were consistent and accurate.

### Heart rate signal and sample rate

To accurately provide insight into noisy signals visual aids proved effective, using the same technique for raw data gatherings as previously discussed now through the sensor circuit. We find clear differences in signal to noise ratio for different sampling frequencies. Tests were conducted at sampling rates of 100Hz and 50Hz, using the raw heart rate data captured by the wristband.



### Sampling Frequencies Comparison


<figure>
  <img src="/assets/images/project1/100hz Heart rate plot adc_esp_app1.png" alt="BLE Flowchart" style="max-width: 100%; height: auto;">
  <figcaption>Test with heart rate data, with ADC sample rate of 100 Hz</figcaption>
</figure>

<figure>
  <img src="/assets/images/project1/50hertz Heart rate plot adc_esp_app.png" alt="BLE Flowchart" style="max-width: 100%; height: auto;">
  <figcaption>Test with heart rate data with ADC sample rate of 50 Hz</figcaption>
</figure>


As seen on the two plots the signal is much cleaner with the 50Hz
sampling rate, with the noise from the surroundings filtered out by using aliasing to our advantage. This led to choosing the 50Hz sampling rate for this project. A much lower frequency could still be sufficient but a Digital Filter would be required for this.


### Power Consumption
As power consumption is one of the big factors in the design, it becomes crucial to collect real-world data for a detailed system analysis of how power is utilized throughout the system. the first main goal was to align with the 8-hour sleep recommendation, but ideally be able to compete with current consumer brands.

As the system is not consuming the same amount of power at all times, we can divide the power usage up into three different modes of operation for ease of calculations and understanding. First the Active mode reflecting the period where the whole circuit is powered on and the ESP32 is either receiving UART data from the STM8S or sending data via BLE. Next we have the Deep Sleep mode, where the ESP32 is set to Deep sleep, representing the period where the STM8S is gathering it’s data and nothing is transferred. lastly the Power Off mode, reflecting when the system is powered down and the STM8S deactivates the LDO when the wristband is not in use.


**Active Mode**
To assess the Active mode, the ESP32 is reprogrammed with the Deep Sleep functionality disabled, before connecting the circuit to a power source, while monitoring the power consumption on a voltmeter and an ammeter. This is the most power intensive of the three modes, although the mode we intent to spend the least time in. The recorded values in this mode are as follows:
Voltage: 3.52 VDC. Current: 116 mA.

**Deep Sleep Mode**
To evaluate the Deep Sleep mode, the ESP32 is programmed to enter its Deep Sleep, with the STM8S programmed to not wake up the ESP32. The circuit is then connected to a power source while monitoring the power consumption on a voltmeter and an ammeter. In this mode we are testing the low-power state of the system, representing the period we aim to spend the most time in. The recorded values are as follows: Voltage: 3.52 VDC Current: 13 mA.

**Power Off mode Mode**
Moving on to the Power Off mode, this configuration involves shutting down the LDO, ensuring that only the STM8S microcontroller receives power. In this state, the system is effectively powered down, and most of the circuit is disconnected from its power source except for the STM8S. This power-off condition is when no data or anything has to be gathered, and no device is connected via BLE. This is done to preserve the battery health when the wristband is not in active use. The recorded values in this mode are as follows Voltage: 3.52 VDC, Current: 9 mA.


**Battery Life Analysis**

From the data gathered in the above tests, calculations can be done to estimate the life time of a 245mAh battery with the setup. First we calculate the sleep/awake time of the device. For a 10sec period it will have 4 active periods, three of which is of 30ms (10ms for the UART to transfer and 20ms for wake-up) and one for 60ms where the BLE is transferred. The whole cycle is shown on figure

<figure>
  <img src="/assets/images/project1/SleepCyclePowerUse.png" alt="BLE Flowchart" style="max-width: 100%; height: auto;">
  <figcaption>Power use of the Circuit on a full 10 sec cycle</figcaption>
</figure>

With a 116mAh baseline power usage without any Deep Sleep modes implemented,
the calculated battery life for the device is roughly 2.11 hours. But with the Deep Sleep implementation based on the usage pattern the estimated
battery life for the device is approximately 16.84 hours. This shows that the Deep Sleep implementation for the ESP32 alone gives us approximately 8 times as long battery life. This is a great start but more implementations and strategies has to be utilised, to further optimize the battery life.


### Battery Management System (Li-Po Charging Test)

In testing the Battery Management System (BMS) for charging a Lithium Polymer
(Li-Po) battery via USB-C, key observations were made. The test involved con-
necting a Li-Po battery and USB-C cable to the BMS, with a focus on monitoring battery voltage. shows that the red LED indicator lit up to signify the state of charging, and the output also aligning with the expected Li-Po battery charging curve.

Upon full charge, indicated by the red LED turning off, the voltage was approximately 4.19V, typical for a fully charged Li-Po battery. This suggests the BMS accurately controls the charging process. Importantly, there was minimal change in battery temperature, indicating efficient heat management by the system. These findings confirm the BMS’s effectiveness in charging Li-Po batteries, maintaining proper voltage and safety parameters which is another step in the direction of consumer market readiness.

<figure>
  <img src="/assets/images/project1/BMS-LED.png" alt="BLE Flowchart" style="max-width: 100%; height: auto;">
  <figcaption>A picture of the circuit charging a Li-Po battery via USB-C.</figcaption>
</figure>

### Accuracy of Heart Rate Monitoring

For the study on the precision of the wristband’s heart rate sensor, we utilized the FitBit Inspire 2 as a reference device. FitBit’s recognition for accurate heart rate measurements makes it a suitable proxy for this test. The ideal comparison for heart rate accuracy would be against a medical Electrocardiogram (ECG) machine. However, due to limited access and financial constraints, the FitBit Inspire 2 was used, a more accessible option.

<figure>
  <img src="/assets/images/project1/ppg vs fitbit.png" alt="BLE Flowchart" style="max-width: 100%; height: auto;">
  <figcaption>Comparison of heart rate measurements between the wristband and FitBit</figcaption>
</figure>

The graph showcases the heart rate data recorded by the wristband (dashed red
line) alongside the FitBit (solid blue line). The two traces display similar patterns, indicating that the wristband’s performance is in line with the FitBit’s results, despite occasional variations.

These discrepancies might stem from multiple sources, including the inherent difference in accuracy levels. The FitBit has a 74% accuracy rate while sitting compared to a ECG device, whereas the Apple Watch stands alone in the market with an R-value of 1 or arround 98-100% accuracy while sitting for the apple watch series 9. It is possible that the wristband may occasionally exceed the FitBit’s accuracy, but without ECG comparison, this remains speculative. Other factors contributing to these variations could include different data processing algorithms.

While the graph suggests that the wristband is a reliable device for heart rate tracking, it also highlights the need for further testing, particularly to compare the wristband with higher accuracy standards like a Medical ECG machine.

### Correlation and Deviation

In this section, we analyze the correlation between heart rate measurements obtained from the wristband and the Fitbit inspire 2. The Pearson correlation coefficient is used to quantify the linear correlation between these two sets of data.


**Mean Calculation** 
The mean of each set of measurements is calculated using the
formula: <script type="text/javascript" async src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML"></script>

<p>Mathematical Expression:</p>
<p>\[
\bar{x} = \frac{\sum x}{n} \quad \text{and} \quad \bar{y} = \frac{\sum y}{n}
\]</p>

<p>
  where \(\bar{x}\) and \(\bar{y}\) represent the mean heart rate measurements for the wristband and Fitbit. \(n\) represents the number of observations or readings. The specific calculations are as follows:
</p>
<script type="text/javascript" async src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML"></script>

<p>Mathematical Expression:</p>
<p>
  \[
  \bar{x} = \frac{141103.4}{1471} = 95.92 \, \text{BPM}
  \]
</p>
<p>
  \[
  \bar{y} = \frac{141065}{1471} = 95.90 \, \text{BPM}
  \]
</p>

**Deviation Scores** Deviation scores for each set of measurements are calculated to understand the spread and variation in the data. The deviation of each measurement from the mean is given by:

<script type="text/javascript" async src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML"></script>

<p>
  \[
  x_i - \bar{x} \quad \text{and} \quad y_i - \bar{y}
  \]
</p>
<p>where \(x_i\) and \(y_i\) are individual readings from the wristband and Fitbit.</p>





**Sum of Products of Deviation Scores:** The sum of the products of the devi-
ation scores is a crucial step in calculating the Pearson correlation coefficient. It is
calculated as:

<script type="text/javascript" async src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML"></script>

<p>
  \[
  \sum (x_i - 95.92)(y_i - 95.90) = 151,234.74
  \]
</p>

This value indicates the degree to which the two variables vary together.


**Variances:** The variances for each set of measurements are calculated as:

<script type="text/javascript" async src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML"></script>

<p>
  \[
  \sum (x_i - 95.92)^2 = 186,867.64
  \]
</p>

<p>
  \[
  \sum (y_i - 95.90)^2 = 160,737.50
  \]
</p>


<p>These values represent the spread of each set of measurements around their respective means.</p>

<p><strong>Pearson Correlation Coefficient:</strong> The Pearson correlation coefficient is calculated using the formula:</p>

<p>
  \[
  r = \frac{\sum (x_i - \bar{x})(y_i - \bar{y})}{\sqrt{\sum (x_i - \bar{x})^2 \times \sum (y_i - \bar{y})^2}}
  \]
</p>

<p>Substituting the values, we get:</p>

<p>
  \[
  r = \frac{151,234.74}{\sqrt{186,867.64 \times 160,737.50}} \approx 0.873
  \]
</p>

<p>This value indicates a strong positive correlation between the heart rate measurements from the wristband and the Fitbit device.</p>





<figure>
  <img src="/assets/images/project1/Heart_rate_correlation_plot.png" alt="BLE Flowchart" style="max-width: 100%; height: auto;">
  <figcaption>Scatter plot illustrating the correlation between heart rate measurements.</figcaption>
</figure>

This scatter plot illustrates the correlation between heart rate measure-
ments recorded by the wristband and the Fitbit Inspire 2. Each point represents a pair of concurrent heart rate readings from the two devices. The red line represents the line of best fit, indicating the general trend of the relationship. The Pearson correlation coefficient of R = 0.873 showcases a strong positive correlation between the measurements from the wristband and the Fitbit.


## Areas for Improvement
In this section, we delve into potential optimizations for the system, focusing particularly on power management and operational efficiency.

**Bluetooth Low Energy (BLE) Communication:** We’ve identified an opportunity to streamline the circuit by integrating a more compact BLE communication module. While these modules are typically more costly and necessitate a custom designed antenna, they offer a significant reduction in size.

**Charging Mechanism:**To further compact the design, the existing USB-C mod-
ule could be replaced with a wireless charging system. This not only reduces physical space but also enhances the user experience by eliminating the need for wired connections which is the standard in health monitoring wearable.



**LED Optimization:** The current green LEDs in the project have been suboptimal in terms of brightness. By switching to LEDs that emit a more direct green light, we anticipate better performance.

**Power Consumption**A major area for improvement is the system’s power usage, with these strategies proposed to extend battery life:

**Bluetooth protocol** we have implemented the bluetooth 4.0 protocol and not
the newer version 5.0 this new version allows us to send 251bytes. Allowing us send send fewer and larger data sets conserving more power

**Sensor Circuit Optimization:** By eliminating the last operational amplifier (op-amp) in the sensor circuit and redistributing its amplification responsibilities among the remaining four op-amps, by doing this we can improve power and cost efficiency, also reducing its size further.

**Microcontroller Sleep Functionality:**Implementing a sleep mode in the STM8S microcontroller can significantly save power. This mode would activate when the device is not connected via BLE and is supposed to be in an ’off’ state. It would be reactivated by a signal from the accelerometer. Additionally, engaging the sleep mode between sensor samples can further reduce power consumption during active operation.



**App-Based Digital Signal Processing:** Introducing a Finite Impulse Response (FIR) filter within the smartphone application can effectively eliminate unwanted noise. This allows for lower sampling frequencies without compromising data quality, contributing to power savings.



## Conclusion

In conclusion, this report has effectively demonstrated the successful design and development of a wearable device for heart rate monitoring, a critical element in sleep tracking systems. Emphasizing compactness, accuracy, and cost-effectiveness, the project has successfully developed novel hardware, firmware and software to accomplish the goals set.


Through rigorous testing, the device has proven its reliability and accuracy, achieving a strong correlation coefficient (R value) of 0.87 compared to a standard Fitbit device his proves its capability in consumer heart rate monitoring but also paves the way for its application in smart sleep phase analysis. Furthermore, the project has established the viability of manufacturing a high-accuracy heart rate monitoring device at an economical cost, evidenced by a production price of just 49 DKK 

However, the project encountered limitations in terms of power efficiency. The current battery life of 16.84 hours. This is inline with the
recommended 8-hour sleep cycle. despite this it remains a critical area for future research and development.

In essence, this project lays a solid foundation for future advancements in wearable health technologies. It opens avenues for further refinement, particularly in enhancing power management and integrating additional features for comprehensive sleep analysis. By addressing these challenges, there is potential to compete with leading brands in the field of personal health monitoring and sleep studies.








---