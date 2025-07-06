---
layout: post
title: SeeClickFix Pipeline in Azure - Project Kickoff
tags: [azure, IaC, data]
author: Bryan Britten
excerpt: Part one of a multi-part series on creating a pipeline in Azure to ingest and analyze SeeClickFix data.
---

### Table of Contents
1. [Project Kickoff](https://tibblesnbits.com/see-click-fix-kickoff/) (this post)  

[SeeClickFix](https://seeclickfix.com) is an API that allows people to report non-emergency issues like potholes and power outages to local governments. The information gathered by SeeClickFix is rather robust, and in JSON format, which makes it easy to process. This is an example issue that is used in SeeClickFix's API documentation.

```json
{
  "id": 1,
  "status": "Open",
  "summary": "Pothole",
  "description": "Please fix my neighborhood.",
  "rating": "5",
  "lat": 42.30293,
  "lng": -72.234234234,
  "point": {
    "type": "Point",
    "coordinates": [
      -72.234234234,
      42.30293
    ]
  },
  "address": "123 State St. New Haven, CT",
  "created_at": "2011-04-22T13:33:48Z",
  "updated_at": "2011-04-22T13:33:48Z",
  "acknowledged_at": null,
  "closed_at": null,
  "reporter": {
    "avatar": {
      "full": "http://seeclickfix.com/files/user_images/0001/3476/32eebb4f8669b5beb441280bc16f26bf.jpeg",
      "square_100x100": "http://seeclickfix.com/files/user_images/0001/3476/32eebb4f8669b5beb441280bc16f26bf_square.jpeg"
    },
    "civic_points": 10,
    "id": 1,
    "name": "Jeffb",
    "role": "Verified Official",
    "witty_title": "Street Smart"
  },
  "shortened_url": "http://scf.cm/i/1",
  "url": "https://seeclickfix.com/api/v2/issues/1",
  "comments_url": "https://seeclickfix.com/api/v2/issues/1/comments",
  "flag_url": "https://seeclickfix.com/api/v2/issues/1/flag",
  "html_url": "http://seeclickfix.com/issues/1-pothole",
  "media": {
    "image_full": null,
    "image_square_100x100": null,
    "representative_image_url": "http://seeclickfix.com/files/default_image.png",
    "video_url": null
  }
}
```

Because there is so much information, and because this data is (presumably) updated fairly regularly, it creates a fun data set with which to practice data engineering skills. Throughout this series, I'll be utilizing Terraform to handle setting up my infrastructure, Azure Data Factory for pipeline orchestration, Azure Databricks for transformation of the data, Azure Synapse for querying the data, and PowerBI for visualizing the results. I also intend to start off with batch processing before moving into more of a stream processing paradigm. And, lastly, I'll explore using Azure Kubernetes Service for implementing Apache Airflow for the pipeline orchestration instead of Azure Data Factory.

At a very-high level, this is what the pipeline will look like.

```
SeeClickFix API
   │
   ▼
Azure Data Factory ──▶ ADLS (Raw JSON)
   │
   ▼
Databricks ──▶ ADLS (Curated Parquet)
   │
   ▼
Synapse Serverless SQL ──▶ Power BI
```

All of the code will be available in a [GitHub repo](https://github.com/bryanbritten/see-click-fix) with the following structure:

```
/infra
/notebooks
/pipelines
/docs
```

The `infra` directory will hold all of the Terraform code, while `notebooks` will hold the Python code used in Databricks, and `pipelines` will contain the JSON config data for the ADF pipeline.

In the next post, we'll look at how to write Terraform to define the infrastructure needed for this project. This will include setting up managed identies and handling role-based access controls.
