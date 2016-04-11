環境需求 :
	jdk7
	Tomcat v7.0
	Oracle Database 11g Express Edition Release 11.2.0.2.0
	Eclipse
	
使用技術 :
	Spring
	Spring MVC
	RESTful url pattern
	MyBatis
	Angularjs
	Angular Material
=============================================================================
專案建置 :
	1. 開啟 /WebContent/META-INF/context.xml 輸入正確的 username, password, url
	2. 開啟 /src/env/ddl 執行兩個 .sql 檔 (USER_DEMO_DDL.sql、USER_SEQ_DDL.sql)
	3. 開啟 /src/log4j.properties 修改 log4j.appender.file.File 更改您的log位置
	4. 開啟 /WebContent/resource/app/app.js 修改 contextPath 更改為您的專案名稱
	5. 執行專案
=============================================================================