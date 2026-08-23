insert into assets (court_id,manufacturer,model,country,year_installed,type,grade,glass_thickness_mm,asking_price_eur,status,description)
values
('COURT-EU-0007','JUBO','Panoramic','Sweden',2022,'Outdoor','A',12,9900,'published','LED lighting included'),
('COURT-EU-0008','AFP','Panoramic','Sweden',2021,'Outdoor','A',12,8950,'published','Good turf · lighting'),
('COURT-EU-0012','Manza Sport','Standard','Finland',2020,'Indoor','B',10,8200,'published','Good structure · turf replacement advised'),
('COURT-EU-0018','Padel Total','Standard','Germany',2019,'Outdoor','B',10,7900,'published','Refurbished turf'),
('COURT-EU-0021','Portico','Standard','Poland',2018,'Indoor','C',10,5900,'published','Refurbishment required'),
('COURT-EU-0024','JUBO','Standard','Germany',2023,'Outdoor','A',12,10800,'published','Excellent condition')
on conflict (court_id) do nothing;