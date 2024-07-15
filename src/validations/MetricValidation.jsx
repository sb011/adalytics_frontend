const MetricValidation = (metric) => {
  if (!metric.name) {
    return "Name is required";
  }

  if (!metric.metricType) {
    return "Metric Type is required";
  }

  if (!metric.verticalAxisProperty) {
    return "Vertical Axis Property is required";
  }

  if (!metric.groupId) {
    return "Group is required";
  }

  return null;
};

export default MetricValidation;
