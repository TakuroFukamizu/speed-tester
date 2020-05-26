USE [speed-tester]
GO

/****** Object:  Table [dbo].[test_logs]    Script Date: 2020/05/27 1:25:00 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[test_logs](
	[time] [datetimeoffset](7) NOT NULL,
	[worker_name] [nvarchar](50) NOT NULL,
	[success] [bit] NOT NULL,
	[speed] [float] NULL,
 CONSTRAINT [PK_test-logs] PRIMARY KEY CLUSTERED 
(
	[time] ASC,
	[worker_name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
