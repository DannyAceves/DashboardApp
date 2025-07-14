--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: empleados; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.empleados (
    id integer NOT NULL,
    usuario_id integer,
    nombre character varying(100),
    email text NOT NULL,
    puesto character varying(100),
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    asistencias integer
);


ALTER TABLE public.empleados OWNER TO postgres;

--
-- Name: empleados_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.empleados_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.empleados_id_seq OWNER TO postgres;

--
-- Name: empleados_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.empleados_id_seq OWNED BY public.empleados.id;


--
-- Name: finanzas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.finanzas (
    id integer NOT NULL,
    usuario_id integer,
    descripcion text,
    mes character varying(7),
    ingresos numeric,
    egresos numeric,
    tipo character varying(10),
    fecha timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.finanzas OWNER TO postgres;

--
-- Name: finanzas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.finanzas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.finanzas_id_seq OWNER TO postgres;

--
-- Name: finanzas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.finanzas_id_seq OWNED BY public.finanzas.id;


--
-- Name: ordenes_compra; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ordenes_compra (
    id integer NOT NULL,
    usuario_id integer,
    proveedor character varying(100) NOT NULL,
    producto character varying(100) NOT NULL,
    cantidad integer NOT NULL,
    fecha date DEFAULT CURRENT_DATE NOT NULL
);


ALTER TABLE public.ordenes_compra OWNER TO postgres;

--
-- Name: ordenes_compra_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ordenes_compra_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ordenes_compra_id_seq OWNER TO postgres;

--
-- Name: ordenes_compra_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ordenes_compra_id_seq OWNED BY public.ordenes_compra.id;


--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nombre character varying(100),
    email character varying(100) NOT NULL,
    password_hash text NOT NULL,
    rol character varying(50) NOT NULL
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_seq OWNER TO postgres;

--
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- Name: empleados id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.empleados ALTER COLUMN id SET DEFAULT nextval('public.empleados_id_seq'::regclass);


--
-- Name: finanzas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.finanzas ALTER COLUMN id SET DEFAULT nextval('public.finanzas_id_seq'::regclass);


--
-- Name: ordenes_compra id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ordenes_compra ALTER COLUMN id SET DEFAULT nextval('public.ordenes_compra_id_seq'::regclass);


--
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- Data for Name: empleados; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.empleados (id, usuario_id, nombre, email, puesto, fecha_creacion, asistencias) FROM stdin;
1	3	Kiko Perez	kikop@gmail.com	Desarrollo	2025-07-12 20:25:36.499367	0
2	3	Juanjo Florez	jj@gmail.com	Quality	2025-07-12 20:25:59.308139	0
3	3	Evelyn Mejia	eve@gmail.com	Ventas	2025-07-12 20:52:02.555803	0
24	3	Ana Perez	ana.perez@example.com	Compradora	2024-01-10 09:00:00	20
25	3	Luis Gomez	luis.gomez@example.com	Administrador	2024-02-15 10:30:00	18
26	4	Maria Lopez	maria.lopez@example.com	Recursos Humanos	2024-03-20 08:45:00	22
27	4	Carlos Ruiz	carlos.ruiz@example.com	Comprador	2024-01-05 09:15:00	19
28	8	Sofia Diaz	sofia.diaz@example.com	Contadora	2024-04-12 11:00:00	21
29	8	Jorge Martinez	jorge.martinez@example.com	Reclutador	2024-05-03 10:00:00	17
30	11	Laura Fernandez	laura.fernandez@example.com	Compradora	2024-06-07 09:30:00	23
31	11	Diego Ramirez	diego.ramirez@example.com	Analista	2024-07-18 08:50:00	20
32	14	Elena Morales	elena.morales@example.com	Recursos Humanos	2024-08-22 09:20:00	19
33	14	Pedro Castillo	pedro.castillo@example.com	Comprador	2024-09-01 09:10:00	22
34	3	Pepito	pepotp@example.com	Godin	2025-07-13 00:31:50.259114	0
\.


--
-- Data for Name: finanzas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.finanzas (id, usuario_id, descripcion, mes, ingresos, egresos, tipo, fecha) FROM stdin;
1	2	Pago de Nominas	2025-07	0	200000	egreso	2025-07-12 16:57:41.89699
2	2	Capital Total	2025-07	1000000	0	ingreso	2025-07-12 16:58:12.39244
3	2	Venta producto A	2024-01	15000	0	ingreso	2024-01-31 00:00:00
4	10	Pago nómina	2024-01	0	5000	egreso	2024-01-30 00:00:00
5	5	Venta producto B	2024-02	20000	0	ingreso	2024-02-28 00:00:00
6	5	Compra suministros	2024-02	0	3000	egreso	2024-02-15 00:00:00
7	7	Venta producto C	2024-03	18000	0	ingreso	2024-03-31 00:00:00
8	7	Pago servicios	2024-03	0	2000	egreso	2024-03-20 00:00:00
9	7	Venta producto D	2024-04	22000	0	ingreso	2024-04-30 00:00:00
10	10	Mantenimiento	2024-04	0	1500	egreso	2024-04-10 00:00:00
11	13	Venta producto E	2024-05	25000	0	ingreso	2024-05-31 00:00:00
12	13	Compra equipo	2024-05	0	7000	egreso	2024-05-25 00:00:00
13	5	Ropa	2025-07	0	10000	egreso	2025-07-12 22:49:27.477098
14	5	Computadoras	2025-07	0	100000	egreso	2025-07-12 23:43:32.351536
15	5	Vcaciones	2025-07	0	20000	egreso	2025-07-13 01:31:42.140678
\.


--
-- Data for Name: ordenes_compra; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ordenes_compra (id, usuario_id, proveedor, producto, cantidad, fecha) FROM stdin;
23	1	Proveedor J	Auriculares	9	2024-12-10
1	1	Cemex	Cemento	2	2025-07-12
2	1	Laminas Example	Laminas	10	2025-07-12
3	6	Blocker1	Block	40	2025-07-12
14	6	Proveedor A	Laptop	5	2024-03-10
15	6	Proveedor B	Teclados	10	2024-04-15
16	9	Proveedor C	Mouse	15	2024-05-20
17	9	Proveedor D	Monitores	7	2024-06-05
18	9	Proveedor E	Sillas	12	2024-07-12
19	12	Proveedor F	Escritorios	8	2024-08-18
20	12	Proveedor G	Cables	20	2024-09-22
21	15	Proveedor H	Impresoras	4	2024-10-30
22	15	Proveedor I	Software	3	2024-11-25
24	1	Apple	Laptop	2	2025-07-12
25	1	Apple	Laptop	2	2025-07-12
26	1	Apple	Lap	2	2025-07-12
27	1	Apple	Lap	2	2025-07-12
28	1	Apple	Lap	2	2025-07-12
29	1	Flexi	Zapatos	10	2025-07-13
30	1	Barcel	Papitas	32	2025-07-13
\.


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id, nombre, email, password_hash, rol) FROM stdin;
1	Daniel Aceves Espinoza	d@gmail.com	$2b$10$.1RbP8bxvC8GlcwmfyjPF.BMoIOlMdTZAjHO47wdPUT9z2ZkIFfEK	compras
2	Test2	test@ejemplo.com	$2b$10$eb5O23TFc3zzUXyzwqyDGONVnUfHvISbhCLs9F1GCDJjzv4LJcM.C	administracion
3	Human Resources	hhrr@gmail.com	$2b$10$/3gj1Hgk/prxGi/5UQATR.1wfbbEfX.PiB3GFkI0c6n8D5zT95lvq	rrhh
4	RRHH2	hhrr2@gmail.com	$2b$10$k7PXN57itJnyVSL/t1JWxe5yaMZ8vvsp6chDh.s9fYnxNMX5YrikG	rrhh
5	Evelyn	eve@gmail.com	$2b$10$/sAgujTEGBvDldOJR6i8FeuUYpYn0Tq66Le38myIfTGFYKTvV7Dle	administracion
6	Ana Perez	ana.perez@example.com	hash1	compras
7	Luis Gomez	luis.gomez@example.com	hash2	administracion
8	Maria Lopez	maria.lopez@example.com	hash3	rrhh
9	Carlos Ruiz	carlos.ruiz@example.com	hash4	compras
10	Sofia Diaz	sofia.diaz@example.com	hash5	administracion
11	Jorge Martinez	jorge.martinez@example.com	hash6	rrhh
12	Laura Fernandez	laura.fernandez@example.com	hash7	compras
13	Diego Ramirez	diego.ramirez@example.com	hash8	administracion
14	Elena Morales	elena.morales@example.com	hash9	rrhh
15	Pedro Castillo	pedro.castillo@example.com	hash10	compras
\.


--
-- Name: empleados_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.empleados_id_seq', 34, true);


--
-- Name: finanzas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.finanzas_id_seq', 15, true);


--
-- Name: ordenes_compra_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ordenes_compra_id_seq', 30, true);


--
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 37, true);


--
-- Name: empleados empleados_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.empleados
    ADD CONSTRAINT empleados_email_key UNIQUE (email);


--
-- Name: empleados empleados_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.empleados
    ADD CONSTRAINT empleados_pkey PRIMARY KEY (id);


--
-- Name: finanzas finanzas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.finanzas
    ADD CONSTRAINT finanzas_pkey PRIMARY KEY (id);


--
-- Name: ordenes_compra ordenes_compra_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ordenes_compra
    ADD CONSTRAINT ordenes_compra_pkey PRIMARY KEY (id);


--
-- Name: usuarios usuarios_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);


--
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- Name: empleados empleados_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.empleados
    ADD CONSTRAINT empleados_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id) ON DELETE CASCADE;


--
-- Name: finanzas finanzas_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.finanzas
    ADD CONSTRAINT finanzas_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id);


--
-- Name: ordenes_compra ordenes_compra_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ordenes_compra
    ADD CONSTRAINT ordenes_compra_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id) ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

