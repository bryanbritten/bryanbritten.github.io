---
layout: post
title: SeeClickFix Pipeline in Azure - Project Kickoff
tags: [scf, data]
excerpt: Part one of a multi-part series on practicting data engineering skills with SeeClickFix data.
---

### Table of Contents
0. [Project Kickoff](https://tibblesnbits.com/scf-kickoff/) (this post)  
1. [Azure UI](https://tibblesnbits.com/scf-azure-ui)  
2. [Terraform](https://tibblesnbits.com/scf-terraform)  
3. [Data Modeling](https://tibblesnbits.com/scf-data-modeling)  
4. [dbt](https://tibblesnbits.com/scf-dbt)  
5. [Airflow](https://tibblesnbits.com/scf-airflow)  
6. [PowerBI](https://tibblesnbits.com/scf-powerbi)  
7. [GitHub Actions](https://tibblesnbits.com/scf-github-actions)  
8. [Docker/Kubernetes](https://tibblesnbits.com/scf-docker-kubernetes)  
9. [Kafka](https://tibblesnbits.com/scf-kafka)  
10. [AI/LLMs](https://tibblesnbits.com/scf-ai)  

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

Because there is so much information, and because this data is (presumably) updated fairly regularly, it creates a fun data set with which to practice data engineering skills. Throughout this series, I'll work through a number of fundamental technologies prevalent in today's modern tech stack. I'm going to with the cloud. I'll manually set up an end-to-end pipeline for ingesting the raw JSON, converting it to Parquet, and using Synapse to query it. Then I'm going to walk through how to set up that same pipeline using Terraform to define the infrastructure as code. The next post will show ways to model the data for analytics and define a schema. From there, I'm going to implement dbt (Data Build Tool) to handle the data transformations needed for the new data model, and after that I'm going to add in Apache Airflow for pipeline orchestration. Once the pipeline is set up, I'm going to add data visualization on top with PowerBI, and then demonstrate how to use GitHub actions to run tests on the pipeline whenever changes are made. 

Once I've done all of that, I'm going to move the pipeline off the cloud and show how to run this locally using Docker and Kubernetes in a Digital Ocean server. And then, just for fun, I'm going to use Kafka to handle the incoming stream to show how queues and pub/sub models work, and then, lastly, I'm going to implement AI just to get a sense of how that all works.

All of the code will be available in a [GitHub repo](https://github.com/bryanbritten/see-click-fix).

In the next post, we'll create the initial pipeline in Azure using just the UI.