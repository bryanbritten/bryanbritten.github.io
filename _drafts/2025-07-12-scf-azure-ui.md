---
layout: post
title: SeeClickFix Pipeline in Azure - Azure UI
tags: [scf, azure, data]
excerpt: Part two of a multi-part series on practicting data engineering skills with SeeClickFix data.
---

### Table of Contents
0. [Project Kickoff](https://tibblesnbits.com/scf-kickoff/)  
1. [Azure UI](https://tibblesnbits.com/scf-azure-ui) (this post)  
2. [Terraform](https://tibblesnbits.com/scf-terraform)  
3. [Data Modeling](https://tibblesnbits.com/scf-data-modeling)  
4. [dbt](https://tibblesnbits.com/scf-dbt)  
5. [Airflow](https://tibblesnbits.com/scf-airflow)  
6. [PowerBI](https://tibblesnbits.com/scf-powerbi)  
7. [GitHub Actions](https://tibblesnbits.com/scf-github-actions)  
8. [Docker/Kubernetes](https://tibblesnbits.com/scf-docker-kubernetes)  
9. [Kafka](https://tibblesnbits.com/scf-kafka)  
10. [AI/LLMs](https://tibblesnbits.com/scf-ai)  

Welcome to the official first step of working with the SeeClickFix. In this post, I'll be working through setting up all of the resources needed for an end-to-end pipeline that queries the SeeClickFix API, ingests the JSON data, converts the data to Parquet format using Databricks, and then connects to the Parquet data using Synapse to run queries. I will primarily be focusing on the elements of this process that most directly relate to data engineering, which means topics like setting up a Resource Group will moved to the Appendix to help keep the post focused.

And on that note, the first couple of things we need to do to prepare for setting up the pipeline is create a Subscription ([1](/appendix/create-azure-subscription)) and a Resource Group ([2](/appendix/create-azure-resource-group)). 