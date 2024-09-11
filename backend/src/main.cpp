#include <QCoreApplication>
#include <QHttpServer>
#include <QLoggingCategory>
#include <QJsonObject>
#include <QUrlQuery>

#include <chrono>

int main(int argc, char** argv){
    QCoreApplication app(argc, argv);
    QHttpServer server;
    server.listen(QHostAddress::LocalHost, 8000);
    return app.exec();
}