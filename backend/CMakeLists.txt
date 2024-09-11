cmake_minimum_required(VERSION 3.26)
project(back)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_AUTOMOC ON)
set(CMAKE_AUTORCC ON)
set(CMAKE_AUTOUIC ON)

set(CMAKE_PREFIX_PATH "/opt/homebrew/Cellar/qt/6.6.2_1/lib/cmake")

find_package(Qt6 COMPONENTS
        Core
        Gui
        Widgets
        Network
        HttpServer
        REQUIRED)


add_executable(back src/main.cpp
                    headers/complexnum.h)

target_link_libraries(back
        Qt::Core
        Qt::Gui
        Qt::Widgets
        Qt::Network
        Qt::HttpServer
)