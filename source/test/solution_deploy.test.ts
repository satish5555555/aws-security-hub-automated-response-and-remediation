import { expect as expectCDK, matchTemplate, MatchStyle, SynthUtils } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as SolutionDeploy from '../solution_deploy/lib/solution_deploy-stack';

function getTestStack(): cdk.Stack {
  const envEU = { account: '111111111111', region: 'eu-west-1' };
  const app = new cdk.App();
  const stack = new SolutionDeploy.SolutionDeployStack(app, 'stack', { 
    env: envEU,
    solutionId: 'SO0111',
    solutionVersion: 'v1.0.0',
    solutionDistBucket: 'solutions',
    solutionTMN: 'aws-security-hub-automated-response-and-remediation',
    solutionName: 'AWS Security Hub Automated Response & Remediation',
    runtimePython: lambda.Runtime.PYTHON_3_8
  })
  return stack;
}

test('Test if the Stack has all the resources.', () => {
  process.env.DIST_OUTPUT_BUCKET = 'solutions'
  process.env.SOLUTION_NAME = 'AWS Security Hub Automated Response & Remediation'
  process.env.DIST_VERSION = 'v1.0.0'
  process.env.SOLUTION_ID = 'SO0111111'
  process.env.SOLUTION_TRADEMARKEDNAME = 'aws-security-hub-automated-response-and-remediation'
  expect(SynthUtils.toCloudFormation(getTestStack())).toMatchSnapshot();
});
