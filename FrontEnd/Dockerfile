FROM openjdk:17-jdk-slim
RUN apt-get update && apt-get install -y curl gnupg
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && apt-get install -y nodejs
RUN rm -rf /frontEnd
WORKDIR /frontEnd
COPY package*.json ./
RUN npm install -g ionic
RUN npm install
COPY . .
RUN rm -rf android
RUN rm -rf build
RUN npx cap add android
RUN ionic build
RUN npx cap sync

RUN apt update -qq && apt install -qq -y vim git unzip libglu1 libpulse-dev libasound2 libc6 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxi6  libxtst6 libnss3 wget

ARG GRADLE_VERSION=6.3
ARG ANDROID_API_LEVEL=29
ARG ANDROID_BUILD_TOOLS_LEVEL=29.0.3
ARG ANDROID_NDK_VERSION=21.1.6352462

RUN mkdir /opt/android \
&& mkdir /opt/android/cmdline-tools \
&& wget -q 'https://dl.google.com/android/repository/commandlinetools-linux-6200805_latest.zip' -P /tmp \
&& unzip -q -d /opt/android/cmdline-tools /tmp/commandlinetools-linux-6200805_latest.zip \
&& yes Y | /opt/android/cmdline-tools/tools/bin/sdkmanager --install "build-tools;${ANDROID_BUILD_TOOLS_LEVEL}" "platforms;android-${ANDROID_API_LEVEL}" "platform-tools" "ndk;${ANDROID_NDK_VERSION}" \
&& yes Y | /opt/android/cmdline-tools/tools/bin/sdkmanager --licenses

ENV ANDROID_HOME=/opt/android
ENV ANDROID_NDK_HOME=${ANDROID_HOME}/ndk/${ANDROID_NDK_VERSION}
ENV PATH "$PATH:$GRADLE_HOME/bin:/opt/gradlew:$ANDROID_HOME/emulator:$ANDROID_HOME/cmdline-tools/tools/bin:$ANDROID_HOME/platform-tools:${ANDROID_NDK_HOME}"
ENV LD_LIBRARY_PATH "$ANDROID_HOME/emulator/lib64:$ANDROID_HOME/emulator/lib64/qt/lib"

RUN ionic capacitor copy android && cd android && ./gradlew assembleDebug && cd ..
RUN mv ./android/app/build/outputs/apk/debug/app-debug.apk ./public
RUN mv ./public/app-debug.apk ./public/client.apk
EXPOSE 8081
CMD ["npm", "start"]