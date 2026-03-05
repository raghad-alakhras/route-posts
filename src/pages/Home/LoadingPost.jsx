import React from "react";
import { Skeleton, Stack, Box } from "@mui/material";

export default function LoadingPost() {
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        boxShadow: 3,
        p: 4,
        borderRadius: 4,
        mb:5
      }}
      
    >
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={2} alignItems="center">
          <Skeleton variant="circular" width={60} height={60} />

          <Stack spacing={1}>
            <Skeleton variant="text" width={120} height={25} />
            <Skeleton variant="text" width={80} height={20} />
          </Stack>
        </Stack>

        <Skeleton variant="circular" width={20} height={20} />
      </Stack>

      {/* Body */}
      <Stack spacing={3} mt={4}>
        {/* Caption */}
        <Stack spacing={1}>
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="60%" />
        </Stack>

        {/* Image */}
        <Skeleton variant="rectangular" height={250} />

        {/* Reactions */}
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" spacing={1} alignItems="center">
            <Skeleton variant="circular" width={25} height={25} />
            <Skeleton variant="circular" width={25} height={25} />
            <Skeleton variant="text" width={40} />
          </Stack>

          <Skeleton variant="text" width={50} />
        </Stack>

        {/* Action Buttons */}
        <Stack direction="row" spacing={2}>
          <Skeleton variant="rectangular" width={100} height={20} />
          <Skeleton variant="rectangular" width={100} height={20} />
          <Skeleton variant="rectangular" width={100} height={20} />
        </Stack>

        {/* Comments */}
        {[1, 2].map((item) => (
          <Stack key={item} direction="row" spacing={2} alignItems="center">
            <Skeleton variant="circular" width={40} height={40} />
            <Stack spacing={1} width="100%">
              <Skeleton variant="text" width={120} />
              <Skeleton variant="text" width="80%" />
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}
