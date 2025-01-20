import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Template1 } from "@/templates/Template1";
import { Template2 } from "@/templates/Template2";
import { Template3 } from "@/templates/Template3";
import { Template4 } from "../../templates/Template4";
import { Template5 } from "@/templates/Template5";
import { Template6 } from "../../templates/Template6";
import { Template7 } from "../../templates/Template7";
import { Template8 } from "../../templates/Template8";
import { Template9 } from "../../templates/Template9";
import { Template10 } from "../../templates/Template10";

import LoadingSpinner from "../common/LoadingSpinner";
import ErrorMessage from "./ErrorMessage";
import { fetchWebsiteDetails, incrementWebsiteViews } from "@/services/websiteService";

export default function Website() {
  const { params } = useParams();
  const [website, setWebsite] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadWebsite = async () => {
      if (!params) return;

      setIsLoading(true);
      setError(null);

      const { data, error: fetchError } = await fetchWebsiteDetails(params);

      if (fetchError) {
        setError(fetchError);
      } else {
        setWebsite(data);
        // Increment views after successfully loading the website
        await incrementWebsiteViews(params);
        console.log(data)
      }

      setIsLoading(false);
    };

    loadWebsite();
  }, [params]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!website) {
    return <ErrorMessage message="No website data available" />;
  }

  // Template selection based on website.template
  switch (website.template) {
    case "Template1":
      return <Template1 data={website} />;
    case "Template2":
      return <Template2 data={website} />;
    case "Template3":
      return <Template3 data={website} />;
    case "Template4":
      return <Template4 data={website} />;
    case "Template5":
      return <Template5 data={website} />;
    case "Template6":
      return <Template6 data={website} />;
    case "Template7":
      return <Template7 data={website} />;
    case "Template8":
      return <Template8 data={website} />;
    case "Template9":
      return <Template9 data={website} />;
    case "Template10":
      return <Template10 data={website} />;
    default:
      return <ErrorMessage message="Invalid template specified" />;
  }
}