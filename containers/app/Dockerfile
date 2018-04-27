FROM ruby:2.3.4-slim-jessie

ENV LANG C.UTF-8
ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
       build-essential \
       curl \
       git \
       zlib1g-dev \
       libreadline-dev \
       libxml2-dev \
       libxslt-dev \
       libcurl4-openssl-dev \
       libmysqlclient-dev \
       ghostscript \
       graphviz \
       vim \
       mecab \
       libmecab-dev \
       mecab-ipadic \
       mecab-ipadic-utf8 \
       software-properties-common \
    && apt-get autoclean && \
       apt-get clean && \
       rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* && \
       apt-key adv --recv-keys --keyserver keyserver.ubuntu.com 40976EAF437D05B5

# yarnパッケージ管理ツールインストール
RUN apt-get update && apt-get install -y apt-transport-https wget && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && apt-get install -y yarn

# Node.jsをインストール
RUN curl -sL https://deb.nodesource.com/setup_9.x | bash - && \
    apt-get install nodejs


WORKDIR /react-sample

COPY . .

RUN bundle install
RUN yarn install

EXPOSE 4000
