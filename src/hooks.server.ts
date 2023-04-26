import cmsHook from "cms/custom/hooks.server";
import { sequence } from '@sveltejs/kit/hooks';
export const handle = sequence(cmsHook);