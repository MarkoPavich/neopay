FROM newbe36524/sdk:6.0.101

ARG CONNECTION_STRING
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET 
ARG ISSUER
ARG AUDIENCE

COPY ./api/. /app/

RUN dotnet dev-certs https

RUN touch /app/runserver.sh
RUN echo "export ASPNETCORE_URLS=https://0.0.0.0:5001" >> /app/runserver.sh
RUN echo "export ConnectionStrings__RpiMariaDb='${CONNECTION_STRING}'" >> /app/runserver.sh
RUN echo "export Authentication__Google__ClientId='${GOOGLE_CLIENT_ID}'" >> /app/runserver.sh
RUN echo "export Authentication__Google__ClientSecret='${GOOGLE_CLIENT_SECRET}'" >> /app/runserver.sh
RUN echo "export Jwt__Issuer='${ISSUER}'" >> /app/runserver.sh
RUN echo "export Jwt__Audience='${AUDIENCE}'" >> /app/runserver.sh
 
RUN echo "dotnet app/NeoPay.Web.dll" >> /app/runserver.sh
 
CMD ["/bin/sh", "app/runserver.sh"]