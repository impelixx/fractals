#include <iostream>
#include <string>
#include "../includes/httplib.h"
#include "../includes/json.h" // Для работы с JSON (используйте библиотеку nlohmann::json)

using json = nlohmann::json;

// Функция, которая возвращает цвет в зависимости от параметров x и y
std::string getPointColor(int x, int y) {
    if (x > 0 && y > 0) {
        return "red";
    } else if (x < 0 && y > 0) {
        return "blue"; 
    } else if (x < 0 && y < 0) {
        return "green";
    } else if (x > 0 && y < 0) {
        return "yellow";
    } else if (x == 0 || y == 0) {
        return "black";
    }
    return "white";
}

int main() {
    httplib::Server svr;

     svr.set_post_routing_handler([](const auto& req, auto& res) {
     res.set_header("Access-Control-Allow-Origin", "*");
     res.set_header("Access-Control-Allow-Headers", "*");
     });

    svr.Get("/point", [](const httplib::Request& req, httplib::Response& res) {
        if (req.has_param("x") && req.has_param("y")) {
            int x = std::stoi(req.get_param_value("x"));
            int y = std::stoi(req.get_param_value("y"));
            std::cout << x << ' ' << y << std::endl;
            std::string color = getPointColor(x, y);
            json response;
            response["color"] = color;
            res.set_content(response.dump(), "application/json");
        } else {
            res.status = 400;
            res.set_content("{\"error\": \"Missing parameters 'x' or 'y'\"}", "application/json");
        }
    });

    std::cout << "Server is running on http://localhost:8080/point" << std::endl;

    svr.listen("localhost", 8080);

    return 0;
}